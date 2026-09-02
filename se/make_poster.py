import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1400, 2100
poster = Image.new('RGB', (W, H), (255, 255, 255))
draw = ImageDraw.Draw(poster)

try:
    font_title = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 28)
    font_step_b = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 18)
    font_sub = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 15)
    font_body = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 14)
    font_body_b = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 14)
    font_small = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 12)
    font_small_b = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 12)
except:
    font_title = font_step_b = font_sub = font_body = font_body_b = font_small = font_small_b = ImageFont.load_default()

# 1. Outer Border
draw.rectangle([(15, 15), (W-15, H-15)], outline=(120, 140, 180), width=2)

# 2. Main Title Banner at top
draw.rectangle([(40, 25), (W-40, 75)], outline=(0, 51, 102), width=2)
title_text = 'E-R DIAGRAM FOR STOCK MAINTENANCE SYSTEM – STEP BY STEP WITH CARDINALITY'
bbox = font_title.getbbox(title_text)
tw = bbox[2] - bbox[0]
draw.text(((W - tw)/2, 35), title_text, fill=(0, 51, 102), font=font_title)

# Separator Grid Lines
draw.line([(15, 600), (W-15, 600)], fill=(180, 180, 200), width=1)
draw.line([(15, 1020), (W-15, 1020)], fill=(180, 180, 200), width=1)
draw.line([(460, 75), (460, 600)], fill=(180, 180, 200), width=1)
draw.line([(910, 75), (910, 600)], fill=(180, 180, 200), width=1)
draw.line([(460, 600), (460, 1020)], fill=(180, 180, 200), width=1)
draw.line([(910, 600), (910, 1020)], fill=(180, 180, 200), width=1)

# STEP 1
draw.text((30, 85), 'STEP 1 – IDENTIFY ENTITIES', fill=(140, 0, 30), font=font_step_b)
draw.text((30, 110), 'List the main nouns in the system.', fill=(40, 40, 40), font=font_sub)

entities = [
    ('1. Product', 'Product'),
    ('2. Category', 'Category'),
    ('3. Supplier', 'Supplier'),
    ('4. Stock', 'Stock'),
    ('5. Purchase', 'Purchase'),
    ('6. Sales', 'Sales'),
    ('7. User', 'User')
]

for i, (ent, box_lbl) in enumerate(entities):
    ey = 145 + i * 36
    draw.text((35, ey + 4), ent, fill=(20, 20, 20), font=font_body)
    draw.rectangle([(275, ey), (435, ey + 26)], fill=(225, 242, 225), outline=(60, 130, 60), width=2)
    tb = font_body.getbbox(box_lbl)
    draw.text((275 + (160 - (tb[2]-tb[0]))/2, ey + 4), box_lbl, fill=(0, 0, 0), font=font_body)

# STEP 2
draw.text((475, 85), 'STEP 2 – IDENTIFY KEY ATTRIBUTES FOR EACH ENTITY', fill=(140, 0, 30), font=font_step_b)
draw.text((475, 110), 'List important attributes and underline the primary key.', fill=(40, 40, 40), font=font_sub)

schemas = [
    ('1. Product', 'Product_ID', ', Product_Name, Description,', '    Price, Quantity, Category_ID, Supplier_ID )'),
    ('2. Category', 'Category_ID', ', Category_Name )', None),
    ('3. Supplier', 'Supplier_ID', ', Supplier_Name, Contact_No,', '    Address )'),
    ('4. Stock', 'Stock_ID', ', Product_ID, Available_Qty,', '    Last_Updated )'),
    ('5. Purchase', 'Purchase_ID', ', Product_ID, Supplier_ID,', '    Quantity, Purchase_Date )'),
    ('6. Sales', 'Sale_ID', ', Product_ID, Quantity, Sale_Date )', None),
    ('7. User', 'User_ID', ', Name, Username, Password, Role )', None)
]

sy = 140
for ent_lbl, pk, rest1, rest2 in schemas:
    draw.text((475, sy), ent_lbl + ' ( ', fill=(20, 20, 20), font=font_body)
    tb1 = font_body.getbbox(ent_lbl + ' ( ')
    pk_x = 475 + (tb1[2] - tb1[0])
    
    draw.text((pk_x, sy), pk, fill=(130, 50, 10), font=font_body_b)
    pk_b = font_body_b.getbbox(pk)
    pk_w = pk_b[2] - pk_b[0]
    draw.line([(pk_x, sy + 15), (pk_x + pk_w, sy + 15)], fill=(130, 50, 10), width=1)
    
    draw.text((pk_x + pk_w, sy), rest1, fill=(40, 40, 40), font=font_body)
    if rest2:
        draw.text((475, sy + 18), rest2, fill=(40, 40, 40), font=font_body)
        sy += 40
    else:
        sy += 36

draw.text((475, sy + 5), '(All primary keys uniquely identify entity records)', fill=(100, 100, 100), font=font_small)

# STEP 3
draw.text((925, 85), 'STEP 3 – IDENTIFY AND DRAW BASIC RELATIONSHIPS', fill=(140, 0, 30), font=font_step_b)
draw.text((925, 110), 'Identify how entities are related (without cardinality first).', fill=(40, 40, 40), font=font_sub)

def draw_ent_box(x, y, w, h, text):
    draw.rectangle([(x, y), (x+w, y+h)], fill=(225, 242, 225), outline=(60, 130, 60), width=2)
    tb = font_small.getbbox(text)
    draw.text((x + (w - (tb[2]-tb[0]))/2, y + (h - (tb[3]-tb[1]))/2), text, fill=(0,0,0), font=font_small)

draw_ent_box(1100, 140, 90, 26, 'User')
draw_ent_box(1100, 230, 90, 26, 'Product')
draw_ent_box(940, 230, 85, 26, 'Category')
draw_ent_box(1265, 230, 85, 26, 'Supplier')
draw_ent_box(1100, 320, 90, 26, 'Stock')
draw_ent_box(940, 320, 85, 26, 'Sales')
draw_ent_box(1265, 320, 85, 26, 'Purchase')

# Manages
draw.polygon([(1145-32, 198), (1145, 198-12), (1145+32, 198), (1145, 198+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1123, 192), 'manages', fill=(0,0,0), font=font_small)
draw.line([(1145, 166), (1145, 186)], fill=(0,0,0), width=1)
draw.line([(1145, 210), (1145, 230)], fill=(0,0,0), width=1)

# Belongs To
draw.polygon([(1062-28, 243), (1062, 243-12), (1062+28, 243), (1062, 243+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1040, 237), 'belongs to', fill=(0,0,0), font=font_small)
draw.line([(1025, 243), (1034, 243)], fill=(0,0,0), width=1)
draw.line([(1090, 243), (1100, 243)], fill=(0,0,0), width=1)

# Supplied By
draw.polygon([(1227-30, 243), (1227, 243-12), (1227+30, 243), (1227, 243+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1202, 237), 'supplied by', fill=(0,0,0), font=font_small)
draw.line([(1190, 243), (1197, 243)], fill=(0,0,0), width=1)
draw.line([(1257, 243), (1265, 243)], fill=(0,0,0), width=1)

# Stored In
draw.polygon([(1145-28, 288), (1145, 288-12), (1145+28, 288), (1145, 288+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1123, 282), 'stored in', fill=(0,0,0), font=font_small)
draw.line([(1145, 256), (1145, 276)], fill=(0,0,0), width=1)
draw.line([(1145, 300), (1145, 320)], fill=(0,0,0), width=1)

# Supplies
draw.polygon([(1307-26, 288), (1307, 288-12), (1307+26, 288), (1307, 288+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1288, 282), 'supplies', fill=(0,0,0), font=font_small)
draw.line([(1307, 256), (1307, 276)], fill=(0,0,0), width=1)
draw.line([(1307, 300), (1307, 320)], fill=(0,0,0), width=1)

# Updates Stock (Sales - Stock)
draw.polygon([(1062-32, 333), (1062, 333-12), (1062+32, 333), (1062, 333+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1038, 327), 'updates', fill=(0,0,0), font=font_small)
draw.line([(1025, 333), (1030, 333)], fill=(0,0,0), width=1)
draw.line([(1094, 333), (1100, 333)], fill=(0,0,0), width=1)

# Updates Stock (Purchase - Stock)
draw.polygon([(1227-32, 333), (1227, 333-12), (1227+32, 333), (1227, 333+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1205, 327), 'updates', fill=(0,0,0), font=font_small)
draw.line([(1190, 333), (1195, 333)], fill=(0,0,0), width=1)
draw.line([(1259, 333), (1265, 333)], fill=(0,0,0), width=1)

# Line from Product to Sales
draw.line([(1100, 250), (982, 250), (982, 320)], fill=(0,0,0), width=1)

# STEP 4
draw.text((30, 610), 'STEP 4 – ADD CARDINALITY (MIN : MAX)', fill=(140, 0, 30), font=font_step_b)
draw.text((30, 635), 'Add cardinality to each relationship.', fill=(40, 40, 40), font=font_sub)

card_items = [
    ('• User – manages – Product', '( 1 : N )'),
    ('• Category – belongs to – Product', '( 1 : N )'),
    ('• Supplier – supplied by – Product', '( 1 : N )'),
    ('• Product – stored in – Stock', '( N : 1 )'),
    ('• Supplier – supplies – Purchase', '( 1 : N )'),
    ('• Purchase – updates stock – Stock', '( N : 1 )'),
    ('• Sales – updates stock – Stock', '( N : 1 )'),
    ('• Product – sold in – Sales', '( 1 : N )'),
]

for i, (rel_t, ratio_t) in enumerate(card_items):
    cy = 665 + i * 32
    draw.text((35, cy), rel_t, fill=(20, 20, 20), font=font_body)
    draw.text((345, cy), ratio_t, fill=(0, 51, 102), font=font_body_b)

draw.text((35, 935), '( Min : Max )', fill=(0, 51, 102), font=font_body_b)
draw.text((135, 935), '0..1 means zero or one,  1..N means one to many', fill=(50, 50, 50), font=font_body)

# STEP 5
draw.text((475, 610), 'STEP 5 – ADD TRANSACTION FLOWS', fill=(140, 0, 30), font=font_step_b)
draw.text((475, 635), 'Add Purchase (stock-in) and Sales (stock-out) cardinality.', fill=(40, 40, 40), font=font_sub)

draw.text((480, 665), '• Supplier – supplies – Purchase  ( 1 : N )', fill=(20, 20, 20), font=font_body)
draw.text((480, 695), '• Purchase – updates stock – Stock  ( N : 1 )', fill=(20, 20, 20), font=font_body)
draw.text((480, 725), '• Sales – updates stock – Stock  ( N : 1 )', fill=(20, 20, 20), font=font_body)

draw_ent_box(490, 790, 85, 26, 'Supplier')
draw_ent_box(650, 790, 95, 26, 'Purchase')
draw_ent_box(805, 790, 80, 26, 'Stock')

draw.line([(575, 803), (650, 803)], fill=(0,0,0), width=1)
draw.polygon([(612-18, 803), (612, 803-10), (612+18, 803), (612, 803+10)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((597, 797), 'supplies', fill=(0,0,0), font=font_small)
draw.text((580, 788), '1', fill=(0,0,0), font=font_body_b)
draw.text((635, 788), 'N', fill=(0,0,0), font=font_body_b)

draw.line([(745, 803), (805, 803)], fill=(0,0,0), width=1)
draw.polygon([(775-18, 803), (775, 803-10), (775+18, 803), (775, 803+10)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((760, 797), 'updates', fill=(0,0,0), font=font_small)
draw.text((750, 788), 'N', fill=(0,0,0), font=font_body_b)
draw.text((792, 788), '1', fill=(0,0,0), font=font_body_b)

draw_ent_box(650, 875, 95, 26, 'Sales')
draw.line([(745, 888), (845, 888), (845, 816)], fill=(0,0,0), width=1)
draw.polygon([(780-18, 888), (780, 888-10), (780+18, 888), (780, 888+10)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((765, 882), 'updates', fill=(0,0,0), font=font_small)
draw.text((750, 873), 'N', fill=(0,0,0), font=font_body_b)
draw.text((850, 840), '1', fill=(0,0,0), font=font_body_b)

# STEP 6
draw.text((925, 610), 'STEP 6 – ADD KEY ATTRIBUTES', fill=(140, 0, 30), font=font_step_b)
draw.text((925, 635), 'Add key attributes (underlined) for important entities.', fill=(40, 40, 40), font=font_sub)

def draw_oval(cx, cy, rx, ry, text, underline=False):
    draw.ellipse([(cx-rx, cy-ry), (cx+rx, cy+ry)], fill=(255, 255, 255), outline=(0,0,0), width=1)
    tb = font_small.getbbox(text)
    tx = cx - (tb[2]-tb[0])/2
    ty = cy - (tb[3]-tb[1])/2
    draw.text((tx, ty), text, fill=(0,0,0), font=font_small)
    if underline:
        draw.line([(tx, ty + (tb[3]-tb[1]) + 1), (tx + (tb[2]-tb[0]), ty + (tb[3]-tb[1]) + 1)], fill=(0,0,0), width=1)

draw_ent_box(960, 780, 95, 30, 'User')
draw_oval(940, 725, 35, 14, 'User_ID', underline=True)
draw_oval(1040, 725, 30, 14, 'Role')
draw_oval(940, 845, 30, 14, 'Name')
draw.line([(940, 739), (980, 780)], fill=(0,0,0), width=1)
draw.line([(1040, 739), (1030, 780)], fill=(0,0,0), width=1)
draw.line([(940, 831), (980, 810)], fill=(0,0,0), width=1)

draw_ent_box(1240, 780, 100, 30, 'Product')
draw_oval(1220, 725, 40, 14, 'Product_ID', underline=True)
draw_oval(1320, 725, 32, 14, 'Price')
draw_oval(1330, 845, 42, 14, 'Category_ID')
draw.line([(1220, 739), (1260, 780)], fill=(0,0,0), width=1)
draw.line([(1320, 739), (1310, 780)], fill=(0,0,0), width=1)
draw.line([(1330, 831), (1310, 810)], fill=(0,0,0), width=1)

draw.line([(1055, 795), (1240, 795)], fill=(0,0,0), width=1)
draw.polygon([(1147-28, 795), (1147, 795-12), (1147+28, 795), (1147, 795+12)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((1125, 789), 'manages', fill=(0,0,0), font=font_small)
draw.text((1070, 780), '1', fill=(0,0,0), font=font_body_b)
draw.text((1220, 780), 'N', fill=(0,0,0), font=font_body_b)

# STEP 7
draw.text((30, 1030), 'STEP 7 – COMPLETE E-R DIAGRAM WITH CARDINALITY', fill=(140, 0, 30), font=font_step_b)

er_img = Image.open('orig_media/word/media/image1.png')
er_resized = er_img.resize((1340, 840), Image.Resampling.LANCZOS)
poster.paste(er_resized, (30, 1065))

# Legend Box
draw.rectangle([(40, 1920), (580, 2065)], outline=(0, 51, 102), fill=(255, 255, 255), width=2)
draw.text((180, 1930), 'LEGEND', fill=(0, 51, 102), font=font_body_b)

draw.rectangle([(60, 1960), (120, 1980)], fill=(225, 242, 225), outline=(60, 130, 60), width=2)
draw.text((140, 1963), 'Entity', fill=(0,0,0), font=font_body)

draw.polygon([(60, 2005), (90, 1995), (120, 2005), (90, 2015)], fill=(254, 243, 199), outline=(180, 130, 20), width=1)
draw.text((140, 1998), 'Relationship', fill=(0,0,0), font=font_body)

draw.ellipse([(60, 2030), (120, 2050)], fill=(255, 255, 255), outline=(0,0,0), width=1)
draw.text((140, 2033), 'Attribute', fill=(0,0,0), font=font_body)

draw.text((280, 1960), '1 : 1      One to One', fill=(0,0,0), font=font_body)
draw.text((280, 1985), '1 : N      One to Many', fill=(0,0,0), font=font_body)
draw.text((280, 2010), 'N : 1      Many to One', fill=(0,0,0), font=font_body)
draw.text((280, 2035), '0..1       Zero or One (Optional)', fill=(0,0,0), font=font_body)

# Note Box
draw.rectangle([(620, 1920), (1350, 2065)], outline=(0, 51, 102), fill=(255, 255, 255), width=2)
draw.text((640, 1935), 'Note:', fill=(0, 51, 102), font=font_body_b)
draw.text((640, 1965), 'This E-R Diagram represents the complete structure of the', fill=(30, 30, 30), font=font_body)
draw.text((640, 1990), 'Stock Maintenance System with all major entities, key attributes,', fill=(30, 30, 30), font=font_body)
draw.text((640, 2015), 'primary/foreign keys, relationship associations, and cardinalities.', fill=(30, 30, 30), font=font_body)

poster.save('Stock_Maintenance_System_Step_by_Step_ER_Poster.png', dpi=(200, 200))
print('Stock_Maintenance_System_Step_by_Step_ER_Poster.png created successfully!')
