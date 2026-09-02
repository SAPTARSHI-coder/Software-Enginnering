
import os
import zipfile
import xml.sax.saxutils as saxutils
from PIL import Image

def escape(s):
    return saxutils.escape(str(s))

def make_run(text, bold=False, italic=False, underline=False, color=None, size=None, font='Calibri'):
    rPr = []
    if font:
        rPr.append(f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:cs="{font}"/>')
    if bold:
        rPr.append('<w:b/>')
    if italic:
        rPr.append('<w:i/>')
    if underline:
        rPr.append('<w:u w:val="single"/>')
    if color:
        rPr.append(f'<w:color w:val="{color}"/>')
    if size:
        rPr.append(f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>')
    
    rPr_xml = f'<w:rPr>{" ".join(rPr)}</w:rPr>' if rPr else ''
    t_xml = f'<w:t xml:space="preserve">{escape(text)}</w:t>'
    return f'<w:r>{rPr_xml}{t_xml}</w:r>'

def make_p(runs, style=None, jc=None, space_before=60, space_after=120, line_spacing=260):
    pPr = []
    if style:
        pPr.append(f'<w:pStyle w:val="{style}"/>')
    if jc:
        pPr.append(f'<w:jc w:val="{jc}"/>')
    pPr.append(f'<w:spacing w:before="{space_before}" w:after="{space_after}" w:line="{line_spacing}" w:lineRule="auto"/>')
    
    pPr_xml = f'<w:pPr>{" ".join(pPr)}</w:pPr>'
    runs_xml = "".join(runs) if isinstance(runs, list) else runs
    return f'<w:p>{pPr_xml}{runs_xml}</w:p>'

def make_title(text):
    return make_p(
        [make_run(text, bold=True, color='003366', size=36, font='Calibri')],
        style='Title', jc='center', space_before=140, space_after=80
    )

def make_subtitle(text):
    return make_p(
        [make_run(text, italic=True, color='4A607A', size=22, font='Calibri')],
        style='Subtitle', jc='center', space_before=0, space_after=220
    )

def make_heading_1(text):
    return make_p(
        [make_run(text, bold=True, color='1F4E79', size=28, font='Calibri')],
        style='Heading1', jc='left', space_before=260, space_after=100
    )

def make_heading_2(text):
    return make_p(
        [make_run(text, bold=True, color='2E5B82', size=24, font='Calibri')],
        style='Heading2', jc='left', space_before=180, space_after=80
    )

def make_heading_3(text):
    return make_p(
        [make_run(text, bold=True, color='1E391E', size=21, font='Calibri')],
        style='Heading3', jc='left', space_before=140, space_after=60
    )

def make_bullet_item(bold_prefix, text_content):
    runs = [
        make_run("•  ", bold=True, color='1F4E79', size=22),
        make_run(bold_prefix, bold=True, color='222222', size=22),
        make_run(text_content, color='333333', size=22)
    ]
    pPr = (
        '<w:pPr>'
        '<w:ind w:left="400" w:hanging="240"/>'
        '<w:spacing w:before="30" w:after="60" w:line="240" w:lineRule="auto"/>'
        '</w:pPr>'
    )
    return f'<w:p>{pPr}{"".join(runs)}</w:p>'

def make_num_item(num_str, bold_prefix, text_content):
    runs = [
        make_run(f"{num_str}.  ", bold=True, color='1F4E79', size=22),
        make_run(bold_prefix, bold=True, color='222222', size=22),
        make_run(text_content, color='333333', size=22)
    ]
    pPr = (
        '<w:pPr>'
        '<w:ind w:left="400" w:hanging="240"/>'
        '<w:spacing w:before="30" w:after="60" w:line="240" w:lineRule="auto"/>'
        '</w:pPr>'
    )
    return f'<w:p>{pPr}{"".join(runs)}</w:p>'

def make_image_p(r_id, cx, cy, caption=None):
    drawing_xml = (
        '<w:drawing>'
        '<wp:inline distT="0" distB="0" distL="0" distR="0">'
        f'<wp:extent cx="{cx}" cy="{cy}"/>'
        f'<wp:docPr id="{r_id}" name="Picture {r_id}"/>'
        '<wp:cNvGraphicFramePr>'
        '<a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>'
        '</wp:cNvGraphicFramePr>'
        '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
        '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
        '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'
        '<pic:nvPicPr>'
        '<pic:cNvPr id="0" name="Picture"/>'
        '<pic:cNvPicPr/>'
        '</pic:nvPicPr>'
        '<pic:blipFill>'
        f'<a:blip r:embed="{r_id}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>'
        '<a:stretch><a:fillRect/></a:stretch>'
        '</pic:blipFill>'
        '<pic:spPr>'
        f'<a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
        '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>'
        '</pic:spPr>'
        '</pic:pic>'
        '</a:graphicData>'
        '</a:graphic>'
        '</wp:inline>'
        '</w:drawing>'
    )
    img_p = f'<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="140" w:after="80"/></w:pPr><w:r>{drawing_xml}</w:r></w:p>'
    if caption:
        cap_p = make_p([make_run(caption, italic=True, size=19, color='666666')], jc='center', space_before=20, space_after=140)
        return img_p + cap_p
    return img_p

def make_table(headers, rows, col_widths, align_cols=None):
    tblPr = (
        '<w:tblPr>'
        '<w:tblW w:w="5000" w:type="pct"/>'
        '<w:jc w:val="center"/>'
        '<w:tblBorders>'
        '<w:top w:val="single" w:sz="6" w:space="0" w:color="1F4E79"/>'
        '<w:left w:val="none"/>'
        '<w:bottom w:val="single" w:sz="6" w:space="0" w:color="1F4E79"/>'
        '<w:right w:val="none"/>'
        '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="D9D9D9"/>'
        '<w:insideV w:val="none"/>'
        '</w:tblBorders>'
        '<w:tblCellMar>'
        '<w:top w:w="120" w:type="dxa"/>'
        '<w:left w:w="160" w:type="dxa"/>'
        '<w:bottom w:w="120" w:type="dxa"/>'
        '<w:right w:w="160" w:type="dxa"/>'
        '</w:tblCellMar>'
        '</w:tblPr>'
    )
    
    tr_header = '<w:tr><w:trPr><w:tblHeader/><w:cantSplit/></w:trPr>'
    for i, h in enumerate(headers):
        w = col_widths[i]
        align = align_cols[i] if align_cols else 'left'
        tr_header += (
            '<w:tc>'
            f'<w:tcPr><w:tcW w:w="{w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="1F4E79"/></w:tcPr>'
            f'<w:p><w:pPr><w:jc w:val="{align}"/><w:spacing w:before="60" w:after="60"/></w:pPr>'
            f'<w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:color w:val="FFFFFF"/></w:rPr><w:t>{escape(h)}</w:t></w:r></w:p>'
            '</w:tc>'
        )
    tr_header += '</w:tr>'
    
    tr_rows = []
    for r_idx, row in enumerate(rows):
        bg = "F4F8FB" if r_idx % 2 == 0 else "FFFFFF"
        tr = '<w:tr><w:trPr><w:cantSplit/></w:trPr>'
        for c_idx, cell in enumerate(row):
            w = col_widths[c_idx]
            align = align_cols[c_idx] if align_cols else 'left'
            cell_runs_xml = ""
            if isinstance(cell, list):
                for item in cell:
                    if isinstance(item, tuple):
                        text, bold, underline, color = item
                        cell_runs_xml += make_run(text, bold=bold, underline=underline, color=color, size=19)
                    else:
                        cell_runs_xml += make_run(str(item), size=19)
            else:
                cell_runs_xml = make_run(str(cell), size=19, color='333333')
                
            tr += (
                '<w:tc>'
                f'<w:tcPr><w:tcW w:w="{w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="{bg}"/></w:tcPr>'
                f'<w:p><w:pPr><w:jc w:val="{align}"/><w:spacing w:before="60" w:after="60"/></w:pPr>{cell_runs_xml}</w:p>'
                '</w:tc>'
            )
        tr += '</w:tr>'
        tr_rows.append(tr)
        
    return f'<w:tbl>{tblPr}{tr_header}{"".join(tr_rows)}</w:tbl><w:p><w:pPr><w:spacing w:before="40" w:after="100"/></w:pPr></w:p>'


