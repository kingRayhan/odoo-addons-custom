# -*- coding: utf-8 -*-
# from odoo import http


# class Custom-addons/student(http.Controller):
#     @http.route('/custom-addons/student/custom-addons/student', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/custom-addons/student/custom-addons/student/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('custom-addons/student.listing', {
#             'root': '/custom-addons/student/custom-addons/student',
#             'objects': http.request.env['custom-addons/student.custom-addons/student'].search([]),
#         })

#     @http.route('/custom-addons/student/custom-addons/student/objects/<model("custom-addons/student.custom-addons/student"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('custom-addons/student.object', {
#             'object': obj
#         })

