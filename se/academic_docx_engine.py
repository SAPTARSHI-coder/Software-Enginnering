import os
import zipfile
import xml.sax.saxutils as saxutils

def escape(s):
    return saxutils.escape(str(s))

def make_run(text, bold=False, italic=False, underline=False, size=24, color="000000", font="Times New Roman"):
    rPr = [f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:cs="{font}"/>']
    if bold:
        rPr.append('<w:b/><w:bCs/>')
    if italic:
        rPr.append('<w:i/><w:iCs/>')
    if underline:
        rPr.append('<w:u w:val="single"/>')
    if color:
        rPr.append(f'<w:color w:val="{color}"/>')
    if size:
        rPr.append(f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>')
    
    rPr_xml = f'<w:rPr>{" ".join(rPr)}</w:rPr>'
    t_xml = f'<w:t xml:space="preserve">{escape(text)}</w:t>'
    return f'<w:r>{rPr_xml}{t_xml}</w:r>'

def make_p(runs, jc="both", space_before=60, space_after=100, line_spacing=276, indent_left=0, indent_hanging=0, page_break_before=False):
    pPr = []
    if page_break_before:
        pPr.append('<w:pageBreakBefore/>')
    if jc:
        pPr.append(f'<w:jc w:val="{jc}"/>')
    pPr.append(f'<w:spacing w:before="{space_before}" w:after="{space_after}" w:line="{line_spacing}" w:lineRule="auto"/>')
    if indent_left or indent_hanging:
        pPr.append(f'<w:ind w:left="{indent_left}" w:hanging="{indent_hanging}"/>')
    
    pPr_xml = f'<w:pPr>{" ".join(pPr)}</w:pPr>'
    runs_xml = "".join(runs) if isinstance(runs, list) else runs
    return f'<w:p>{pPr_xml}{runs_xml}</w:p>'

def make_title(text):
    return make_p(
        [make_run(text, bold=True, color="000000", size=48, font="Times New Roman")],
        jc="center", space_before=240, space_after=120
    )

def make_subtitle(text):
    return make_p(
        [make_run(text, italic=True, bold=True, color="000000", size=28, font="Times New Roman")],
        jc="center", space_before=40, space_after=240
    )

def make_h1(text, page_break=False):
    return make_p(
        [make_run(text.upper(), bold=True, color="000000", size=32, font="Times New Roman")],
        jc="left", space_before=280, space_after=120, page_break_before=page_break
    )

def make_h2(text):
    return make_p(
        [make_run(text, bold=True, color="000000", size=28, font="Times New Roman")],
        jc="left", space_before=200, space_after=100
    )

def make_h3(text):
    return make_p(
        [make_run(text, bold=True, color="000000", size=24, font="Times New Roman")],
        jc="left", space_before=140, space_after=80
    )

def make_body(text):
    return make_p(
        [make_run(text, color="000000", size=24, font="Times New Roman")],
        jc="both", space_before=40, space_after=100, line_spacing=276
    )

def make_bullet(bold_prefix, text_content):
    runs = [
        make_run("•  ", bold=True, color="000000", size=24),
        make_run(bold_prefix, bold=True, color="000000", size=24),
        make_run(text_content, color="000000", size=24)
    ]
    return make_p(runs, jc="both", space_before=30, space_after=60, line_spacing=260, indent_left=480, indent_hanging=240)

def make_num(num_str, bold_prefix, text_content):
    runs = [
        make_run(f"{num_str}.  ", bold=True, color="000000", size=24),
        make_run(bold_prefix, bold=True, color="000000", size=24),
        make_run(text_content, color="000000", size=24)
    ]
    return make_p(runs, jc="both", space_before=30, space_after=60, line_spacing=260, indent_left=480, indent_hanging=240)

def make_callout_box(title, text):
    title_run = make_run(title, bold=True, color="000000", size=24)
    text_run = make_run(text, italic=True, color="000000", size=24)
    
    tblPr = (
        '<w:tblPr>'
        '<w:tblW w:w="5000" w:type="pct"/>'
        '<w:jc w:val="center"/>'
        '<w:tblBorders>'
        '<w:top w:val="single" w:sz="8" w:space="0" w:color="000000"/>'
        '<w:left w:val="single" w:sz="24" w:space="0" w:color="000000"/>'
        '<w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/>'
        '<w:right w:val="single" w:sz="8" w:space="0" w:color="000000"/>'
        '</w:tblBorders>'
        '<w:tblCellMar>'
        '<w:top w:w="140" w:type="dxa"/>'
        '<w:left w:w="200" w:type="dxa"/>'
        '<w:bottom w:w="140" w:type="dxa"/>'
        '<w:right w:w="200" w:type="dxa"/>'
        '</w:tblCellMar>'
        '</w:tblPr>'
    )
    
    cell_p1 = f'<w:p><w:pPr><w:jc w:val="left"/><w:spacing w:before="60" w:after="40"/></w:pPr>{title_run}</w:p>'
    cell_p2 = f'<w:p><w:pPr><w:jc w:val="both"/><w:spacing w:before="40" w:after="60"/><w:line w:line="276" w:lineRule="auto"/></w:pPr>{text_run}</w:p>'
    
    tr = (
        '<w:tr><w:trPr><w:cantSplit/></w:trPr>'
        f'<w:tc><w:tcPr><w:tcW w:w="9000" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F5F5F5"/></w:tcPr>'
        f'{cell_p1}{cell_p2}'
        '</w:tc></w:tr>'
    )
    return f'<w:tbl>{tblPr}{tr}</w:tbl><w:p><w:pPr><w:spacing w:before="40" w:after="100"/></w:pPr></w:p>'

def make_table(headers, rows, col_widths, align_cols=None):
    tblPr = (
        '<w:tblPr>'
        '<w:tblW w:w="5000" w:type="pct"/>'
        '<w:jc w:val="center"/>'
        '<w:tblBorders>'
        '<w:top w:val="single" w:sz="8" w:space="0" w:color="000000"/>'
        '<w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/>'
        '<w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
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
        align = align_cols[i] if align_cols else "left"
        tr_header += (
            '<w:tc>'
            f'<w:tcPr><w:tcW w:w="{w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="000000"/></w:tcPr>'
            f'<w:p><w:pPr><w:jc w:val="{align}"/><w:spacing w:before="60" w:after="60"/></w:pPr>'
            f'<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:b/><w:bCs/><w:sz w:val="22"/><w:szCs w:val="22"/><w:color w:val="FFFFFF"/></w:rPr><w:t>{escape(h)}</w:t></w:r></w:p>'
            '</w:tc>'
        )
    tr_header += '</w:tr>'
    
    tr_rows = []
    for r_idx, row in enumerate(rows):
        bg = "F5F5F5" if r_idx % 2 == 0 else "FFFFFF"
        tr = '<w:tr><w:trPr><w:cantSplit/></w:trPr>'
        for c_idx, cell in enumerate(row):
            w = col_widths[c_idx]
            align = align_cols[c_idx] if align_cols else "left"
            if isinstance(cell, tuple):
                text, is_bold = cell
                cell_run = make_run(str(text), bold=is_bold, color="000000", size=22, font="Times New Roman")
            else:
                cell_run = make_run(str(cell), color="000000", size=22, font="Times New Roman")
                
            tr += (
                '<w:tc>'
                f'<w:tcPr><w:tcW w:w="{w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="{bg}"/></w:tcPr>'
                f'<w:p><w:pPr><w:jc w:val="{align}"/><w:spacing w:before="60" w:after="60"/></w:pPr>{cell_run}</w:p>'
                '</w:tc>'
            )
        tr += '</w:tr>'
        tr_rows.append(tr)
        
    return f'<w:tbl>{tblPr}{tr_header}{"".join(tr_rows)}</w:tbl><w:p><w:pPr><w:spacing w:before="40" w:after="100"/></w:pPr></w:p>'

def package_docx(template_path, output_path, body_paragraphs):
    body_xml = "".join(body_paragraphs)
    
    header_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
        '<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" '
        'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
        'xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" '
        'xmlns:v="urn:schemas-microsoft-com:vml" '
        'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
        'xmlns:w10="urn:schemas-microsoft-com:office:word" '
        'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
        'xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" '
        'mc:Ignorable="w14"><w:body>'
    )
    
    sect_pr = (
        '<w:sectPr>'
        '<w:pgSz w:w="11906" w:h="16838"/>'
        '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>'
        '<w:pgBorders w:offsetFrom="page">'
        '<w:top w:val="single" w:sz="18" w:space="24" w:color="000000"/>'
        '<w:left w:val="single" w:sz="18" w:space="24" w:color="000000"/>'
        '<w:bottom w:val="single" w:sz="18" w:space="24" w:color="000000"/>'
        '<w:right w:val="single" w:sz="18" w:space="24" w:color="000000"/>'
        '</w:pgBorders>'
        '<w:cols w:space="708"/>'
        '<w:docGrid w:linePitch="360"/>'
        '</w:sectPr></w:body></w:document>'
    )
    
    final_doc_xml = f"{header_xml}{body_xml}{sect_pr}"
    
    with zipfile.ZipFile(template_path, "r") as src, zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as dst:
        for item in src.infolist():
            if item.filename == "word/document.xml":
                dst.writestr(item.filename, final_doc_xml.encode("utf-8"))
            elif not item.filename.startswith("word/media/"):
                dst.writestr(item.filename, src.read(item.filename))
                
    print(f"Successfully generated: {output_path} (Size: {os.path.getsize(output_path)} bytes)")
