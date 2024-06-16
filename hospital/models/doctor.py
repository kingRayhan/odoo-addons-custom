from odoo import models, fields


class HospitalDoctor(models.Model):
    _name = "hospital.doctor"
    _inherit = 'mail.thread'
    _description = "Doctor Record"

    name = fields.Char(string="Doctor Name", required=True, tracking=True)
    reference = fields.Char(string="Reference", required=True, tracking=True)
    notes = fields.Text(string="Notes", required=False)
