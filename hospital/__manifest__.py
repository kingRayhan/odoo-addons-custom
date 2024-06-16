{
    'name': 'Hospital Management',
    'summery': 'This is a custom hospital management app in odoo',
    'version': '1.0.0',
    'license': 'OPL-1',
    'author': 'King Rayhan',
    'website': 'https://github.com/kingrayhan',
    'application': True,
    'depends': ['mail'],
    'data': [
        'security/ir.model.access.csv',
        'views/menu.xml',
        'views/patient.xml',
        'views/doctor.xml',
    ]
}
