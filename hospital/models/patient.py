from odoo import models, fields, api
from odoo.exceptions import ValidationError


class HospitalPatient(models.Model):
    _name = "hospital.patient"
    _inherit = 'mail.thread'
    _description = "Patient Record"

    name = fields.Char(string="Patient Name", required=True, tracking=True)
    capitalize_name = fields.Char(string="Capitalize Name", readonly=True, compute="_compute_capitalize_name")
    age = fields.Integer(string="Age", required=True, tracking=True)
    is_child = fields.Boolean(string="Is Child", required=True, tracking=True)
    gender = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
    ], string="Gender", required=True)
    blood_group = fields.Selection([
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
        ('ABO+', 'ABO+'),
        ('ABO-', 'ABO-'),
    ], string="Blood Group", required=False)
    date_of_birth = fields.Date(string="Date of Birth", required=False)
    notes = fields.Text(string="Notes", required=False)
    doctor_id = fields.Many2one('hospital.doctor', string="Doctor")
    state = fields.Selection([
        ('awaiting', 'Awaiting'),
        ('appointed', 'Appointed'),
        ('cancelled', 'Cancelled'),
        ('cancelled_appointment', 'Cancelled Appointment'),
        ('discharged', 'Discharged'),
        ('died', 'Died'),
    ], string="Status", default="awaiting")

    @api.onchange('age')
    def _onchange_age(self):
        if self.age <= 10:
            self.is_child = True
        else:
            self.is_child = False

    # @api.onchange('name')
    # def _onchange_name(self):
    #     self.capitalize_name = self.name.capitalize()

    @api.depends('name')
    def _compute_capitalize_name(self):
        for record in self:
            if record.name:
                record.capitalize_name = record.name.upper()
            else:
                record.capitalize_name = 'N/A'

    @api.constrains('is_child', 'age')
    def _check_is_child_age(self):
        for record in self:
            if record.is_child and record.age == 0:
                raise ValidationError('Age has to be recorded for a child.')
