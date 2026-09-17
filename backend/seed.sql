-- ============================================================
-- Données de test pour l'API Gestion de Stock
-- ============================================================

USE estoque;

-- Nettoyage (respecte l'ordre des FK)
DELETE FROM movimentacao_estoque;
DELETE FROM produto;
DELETE FROM fornecedor;
DELETE FROM categoria;

ALTER TABLE categoria AUTO_INCREMENT = 1;
ALTER TABLE fornecedor AUTO_INCREMENT = 1;
ALTER TABLE produto AUTO_INCREMENT = 1;
ALTER TABLE movimentacao_estoque AUTO_INCREMENT = 1;

-- ============================================================
-- CATÉGORIES (10)
-- ============================================================
INSERT INTO categoria (nome) VALUES
('Notebooks'),
('Souris'),
('Claviers'),
('Écrans'),
('Casques'),
('Webcams'),
('Disques durs'),
('Clés USB'),
('Imprimantes'),
('Accessoires');

-- ============================================================
-- FOURNISSEURS (8)
-- ============================================================
INSERT INTO fornecedor (nome, cnpj, telefone, email) VALUES
('Tech Distribuidora',    '12.345.678/0001-99', '(11) 99999-8888', 'contato@techdistribuidora.com'),
('Info Plus SARL',        '23.456.789/0001-11', '(11) 98888-7777', 'ventes@infoplus.com'),
('Global Import',         '34.567.890/0001-22', '(21) 97777-6666', 'sales@globalimport.com'),
('Electro Market',        '45.678.901/0001-33', '(31) 96666-5555', 'info@electromarket.com'),
('Digital Store',         '56.789.012/0001-44', '(41) 95555-4444', 'contact@digitalstore.com'),
('Mega Computadores',     '67.890.123/0001-55', '(51) 94444-3333', 'mega@computadores.com'),
('Fournitures Pro',       '78.901.234/0001-66', '(61) 93333-2222', 'pro@fournitures.com'),
('Techno Shop',           '89.012.345/0001-77', '(71) 92222-1111', 'shop@techno.com');

-- ============================================================
-- PRODUITS (100)
-- ============================================================

-- Notebooks (10)
INSERT INTO produto (nome, descricao, preco, quantidade, categoria_id, fornecedor_id) VALUES
('Notebook Lenovo IdeaPad 3',    'Intel i5, 8GB RAM, 256GB SSD',         3999.90, 15, 1, 1),
('Notebook Dell Inspiron 15',    'Intel i7, 16GB RAM, 512GB SSD',        5499.00, 10, 1, 2),
('Notebook HP Pavilion 14',      'AMD Ryzen 5, 8GB RAM, 512GB SSD',      4299.50,  8, 1, 3),
('Notebook Acer Aspire 5',       'Intel i5, 8GB RAM, 512GB SSD',         3899.00, 12, 1, 4),
('Notebook Asus VivoBook 15',    'Intel i3, 4GB RAM, 256GB SSD',         2799.90, 20, 1, 5),
('Notebook MSI Gaming GF63',     'Intel i7, 16GB RAM, RTX 3050',         7499.00,  5, 1, 6),
('Notebook Samsung Book',        'Intel i5, 8GB RAM, 256GB SSD',         3599.00, 14, 1, 7),
('Notebook Apple MacBook Air',   'M2, 8GB RAM, 256GB SSD',               8999.00,  4, 1, 8),
('Notebook LG Gram 16',          'Intel i7, 16GB RAM, 1TB SSD',          8299.00,  3, 1, 1),
('Notebook Positivo Motion',     'Intel Celeron, 4GB RAM, 128GB SSD',    1899.90, 25, 1, 2),

-- Souris (10)
('Souris Logitech M170',         'Sans fil, 1000 DPI',                      59.90, 50, 2, 1),
('Souris Logitech MX Master 3',  'Sans fil, 4000 DPI, ergonomique',        499.00, 20, 2, 1),
('Souris Microsoft Basic',       'Filaire, 1000 DPI',                       39.90, 80, 2, 2),
('Souris Razer DeathAdder',      'Filaire, 6400 DPI, gaming',              249.90, 25, 2, 3),
('Souris SteelSeries Rival 3',   'Filaire, 8500 DPI, gaming',              199.00, 30, 2, 4),
('Souris Corsair Harpoon',       'Filaire, 6000 DPI, RGB',                 179.00, 22, 2, 5),
('Souris Apple Magic Mouse',     'Sans fil, tactile',                      699.00, 10, 2, 8),
('Souris Dell MS116',            'Filaire, 1000 DPI',                       44.90, 60, 2, 6),
('Souris HP X3000',              'Sans fil, 1600 DPI',                      89.90, 45, 2, 7),
('Souris Multilaser Sem Fio',    'Sans fil, 1600 DPI',                      49.90, 100,2, 4),

-- Claviers (10)
('Clavier Logitech K120',        'Filaire, AZERTY',                         89.90, 40, 3, 1),
('Clavier Logitech MX Keys',     'Sans fil, rétroéclairé',                 799.00, 12, 3, 1),
('Clavier Microsoft Wired 600',  'Filaire, AZERTY',                         99.90, 35, 3, 2),
('Clavier Razer BlackWidow',     'Mécanique, RGB, gaming',                 899.00,  8, 3, 3),
('Clavier Corsair K55',          'Membrane, RGB, gaming',                  349.00, 15, 3, 5),
('Clavier Redragon Kumara',      'Mécanique, RGB, gaming',                 299.00, 18, 3, 4),
('Clavier Apple Magic Keyboard', 'Sans fil, AZERTY',                      1099.00,  5, 3, 8),
('Clavier HP 150',               'Filaire, AZERTY',                         69.90, 55, 3, 6),
('Clavier Multilaser TC193',     'Filaire, AZERTY',                         49.90, 70, 3, 4),
('Clavier HyperX Alloy Core',    'Membrane, RGB, gaming',                  399.00, 14, 3, 7),

-- Écrans (10)
('Écran Samsung 24" FHD',        '24 pouces, 1920x1080, IPS, 75Hz',        899.00, 20, 4, 1),
('Écran LG 27" 4K',              '27 pouces, 3840x2160, IPS, HDR',        2499.00,  8, 4, 2),
('Écran Dell 22" FHD',           '22 pouces, 1920x1080, IPS',              699.00, 25, 4, 3),
('Écran AOC 24" 144Hz',          '24 pouces, 1920x1080, gaming',          1099.00, 12, 4, 4),
('Écran Asus 27" 165Hz',         '27 pouces, 2560x1440, gaming',          1899.00,  7, 4, 5),
('Écran BenQ 32" 4K',            '32 pouces, 3840x2160, IPS',             3299.00,  4, 4, 6),
('Écran Philips 24" FHD',        '24 pouces, 1920x1080, IPS',              849.00, 18, 4, 7),
('Écran Acer 21.5" FHD',         '21.5 pouces, 1920x1080',                 599.00, 30, 4, 8),
('Écran LG UltraWide 34"',       '34 pouces, 2560x1080, IPS',             2799.00,  5, 4, 2),
('Écran Samsung Odyssey G5',     '27 pouces, 2560x1440, 144Hz',           2199.00,  6, 4, 1),

-- Casques (10)
('Casque JBL Tune 510BT',        'Bluetooth, sans fil',                    249.00, 40, 5, 1),
('Casque Sony WH-1000XM5',       'Bluetooth, réduction de bruit',         2999.00,  8, 5, 2),
('Casque Bose QuietComfort',     'Bluetooth, réduction de bruit',         2799.00,  6, 5, 3),
('Casque HyperX Cloud II',       'Filaire, gaming, micro',                 599.00, 20, 5, 4),
('Casque Razer Kraken',          'Filaire, gaming, micro',                 499.00, 25, 5, 5),
('Casque Logitech G335',         'Filaire, gaming, micro',                 449.00, 18, 5, 1),
('Casque Apple AirPods Max',     'Bluetooth, réduction de bruit',         5499.00,  3, 5, 8),
('Casque Corsair Void RGB',      'Filaire, gaming, micro',                 699.00, 12, 5, 6),
('Casque Samsung Galaxy Buds',   'Écouteurs Bluetooth',                    799.00, 30, 5, 7),
('Casque Sony WF-1000XM4',       'Écouteurs Bluetooth ANC',               1999.00, 10, 5, 2),

-- Webcams (10)
('Webcam Logitech C270',         '720p, 30 fps',                           199.00, 35, 6, 1),
('Webcam Logitech C920',         '1080p, 30 fps',                          549.00, 20, 6, 1),
('Webcam Logitech Brio 4K',      '4K, 30 fps, HDR',                       1999.00,  6, 6, 1),
('Webcam Microsoft LifeCam',     '1080p, 30 fps',                          449.00, 18, 6, 2),
('Webcam Razer Kiyo',            '1080p, avec anneau LED',                 799.00, 10, 6, 3),
('Webcam Dell UltraSharp',       '1080p, autofocus',                       899.00,  8, 6, 4),
('Webcam HP 320 FHD',            '1080p, micro intégré',                   249.00, 22, 6, 5),
('Webcam Aukey PC-LM1E',         '1080p, 30 fps',                          179.00, 28, 6, 6),
('Webcam Multilaser WC045',      '720p, micro intégré',                     99.90, 45, 6, 7),
('Webcam Insta360 Link',         '4K, IA, suivi automatique',             2999.00,  4, 6, 8),

-- Disques durs (10)
('HDD Seagate 1TB',              '3.5", 7200 RPM, SATA',                   349.00, 30, 7, 1),
('HDD Seagate 2TB',              '3.5", 7200 RPM, SATA',                   499.00, 20, 7, 1),
('HDD WD 4TB',                   '3.5", 5400 RPM, SATA',                   699.00, 15, 7, 2),
('HDD Toshiba 1TB',              '3.5", 7200 RPM, SATA',                   329.00, 25, 7, 3),
('SSD Samsung 500GB',            '2.5", SATA, 560 MB/s',                   399.00, 35, 7, 4),
('SSD Samsung 1TB NVMe',         'M.2 NVMe, 3500 MB/s',                    799.00, 22, 7, 4),
('SSD Kingston 480GB',           '2.5", SATA, 500 MB/s',                   299.00, 40, 7, 5),
('SSD WD Black 1TB NVMe',        'M.2 NVMe, 3400 MB/s',                    899.00, 12, 7, 6),
('SSD Crucial 2TB',              '2.5", SATA, 540 MB/s',                   999.00, 10, 7, 7),
('SSD Kingston 240GB',           '2.5", SATA, 500 MB/s',                   189.00, 50, 7, 8),

-- Clés USB (10)
('Clé USB Kingston 32GB',        'USB 3.0',                                  39.90, 100, 8, 1),
('Clé USB Kingston 64GB',        'USB 3.0',                                  59.90,  80, 8, 1),
('Clé USB SanDisk 128GB',        'USB 3.0',                                  99.90,  60, 8, 2),
('Clé USB SanDisk 256GB',        'USB 3.0',                                 179.00,  35, 8, 2),
('Clé USB Lexar 64GB',           'USB 3.0',                                  49.90,  70, 8, 3),
('Clé USB Samsung Bar 128GB',    'USB 3.1',                                 119.00,  45, 8, 4),
('Clé USB Corsair 32GB',         'USB 3.0',                                  44.90,  65, 8, 5),
('Clé USB HP 64GB',              'USB 2.0',                                  39.90,  90, 8, 6),
('Clé USB Multilaser 16GB',      'USB 2.0',                                  24.90, 120, 8, 7),
('Clé USB Kingston 512GB',       'USB 3.2',                                 349.00,  20, 8, 8),

-- Imprimantes (10)
('Imprimante HP DeskJet 2320',   'Jet d''encre couleur',                    399.00, 15, 9, 1),
('Imprimante HP LaserJet M15',   'Laser monochrome',                        899.00, 10, 9, 1),
('Imprimante Epson L3250',       'Jet d''encre couleur, WiFi',              999.00, 12, 9, 2),
('Imprimante Canon PIXMA G3110','Jet d''encre couleur',                    1099.00,  8, 9, 3),
('Imprimante Brother HL-1222',   'Laser monochrome',                        849.00, 14, 9, 4),
('Imprimante Xerox Phaser 3020', 'Laser monochrome',                        899.00,  9, 9, 5),
('Imprimante Samsung Xpress',    'Laser monochrome',                        949.00,  7, 9, 6),
('Imprimante Epson EcoTank',     'Jet d''encre couleur, réservoir',        1299.00,  6, 9, 2),
('Imprimante HP Envy 6055',      'Jet d''encre, WiFi',                      799.00, 11, 9, 1),
('Imprimante Brother MFC-J1010','Multifonction jet d''encre',              1199.00,  5, 9, 4),

-- Accessoires (10)
('Hub USB-C 7 en 1',             'HDMI, USB 3.0, lecteur SD',               199.00, 30, 10, 1),
('Support écran double',         'Pour 2 écrans 13-27"',                    249.00, 15, 10, 2),
('Câble HDMI 2m',                'HDMI 2.0, 4K 60Hz',                        49.90, 100,10, 3),
('Câble USB-C 1m',               'USB-C vers USB-C, 60W',                    59.90,  80,10, 4),
('Sacoche ordinateur 15"',       'Résistante à l''eau',                     129.00, 40, 10, 5),
('Souris sans fil ergonomique',  'Bluetooth + USB',                         149.00, 25, 10, 6),
('Refroidisseur pour PC',        '6 ventilateurs RGB',                      199.00, 20, 10, 7),
('Onduleur 600VA',               'Batterie, 4 prises',                      349.00, 12, 10, 8),
('Rallonge électrique 5 prises', 'Avec interrupteur',                        39.90, 60, 10, 1),
('Nettoyant écran spray',        '100ml avec chiffon',                       29.90, 50, 10, 2);

-- ============================================================
-- MOUVEMENTS DE STOCK (exemples)
-- ============================================================

-- Entrées initiales (pour 30 premiers produits)
INSERT INTO movimentacao_estoque (tipo, quantidade, observacao, data, produto_id) VALUES
('ENTRADA', 20, 'Stock initial', NOW(),  1),
('ENTRADA', 15, 'Stock initial', NOW(),  2),
('ENTRADA', 10, 'Stock initial', NOW(),  3),
('ENTRADA', 25, 'Stock initial', NOW(),  4),
('ENTRADA', 30, 'Stock initial', NOW(),  5),
('ENTRADA', 50, 'Réapprovisionnement', NOW(), 11),
('ENTRADA', 30, 'Réapprovisionnement', NOW(), 12),
('ENTRADA', 80, 'Réapprovisionnement', NOW(), 13),
('ENTRADA', 40, 'Réapprovisionnement', NOW(), 21),
('ENTRADA', 100,'Réapprovisionnement', NOW(), 41);

-- Sorties (ventes)
INSERT INTO movimentacao_estoque (tipo, quantidade, observacao, data, produto_id) VALUES
('SAIDA', 3, 'Vente client A', NOW(),  1),
('SAIDA', 2, 'Vente client B', NOW(),  2),
('SAIDA', 5, 'Vente client C', NOW(), 11),
('SAIDA', 10,'Vente client D', NOW(), 41),
('SAIDA', 1, 'Vente client E', NOW(),  8);
