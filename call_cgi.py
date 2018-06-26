#!/usr/bin/python

## call_cgi.py
## script to handle ajax request and draw the second and third panel

import re
import sys
import sqlite3
import cgi, cgitb

cgitb.enable()

# the body part of html
print("""Content-type:text/html\n\n""")


#print("<p>ajflkajsdfl;aksjdf;lskjflaj;lkdfjaldfja;ljfl;ajfasdjf;lakjl;askdjfasdfasdfadfadfadfadfadfadfassafasdfafadf </p>")
#print(""" <body onload="setNewWindowToAllATags()"> """)


#with open("Header.html", "r") as fin:
#    print(fin.read())

#print('<div class="row">')

conn = sqlite3.connect('mito.db')
c = conn.cursor()

response=""
#response+="Content-type:text/html\n\n"

#response +="""<script>

#		$('#demolist li').on('click', function(){"""
#    			$('#datebox').val($(this).text());


#response+="""			}); """

def print_table(tableName,response, c):
    if tableName.lower()== "patient_nucleobase":
        response+="""
                <table class="table table-condensed table-responsive-sm" >
                    <tr>
			<th>Patient ID </th>
                      <th>Seq</th>
                        <th>Pos</th>
                        <th>left_flank</th>
                        <th>ref_allele</th>
                        <th>right_allele</th>
                        <th>Variant</th>
                        <th>Cov_variant_-</th>
                        <th>Cov_-</th>
                        <th>Cov_variant_+</th>
                        <th>Cov_+</th>
                        <th>Freq_variant_-</th>
                        <th>Freq_variant_+</th>
                        </tr>

                <tbody>"""
        for row in c.execute("""SELECT * FROM patient_nucleobase;"""):
            response+="""<tr>"""
            for column in row:
                response += """<td> """+column+"""</td>"""
            response+="""</tr>"""

    if tableName.lower()== "pathogenic_prob":
        response+="""
                <table class="table table-condensed table-responsive-sm" >
                    <tr>
                      <th>Variant_ID</th>
                        <th>Type</th>
                        <th>AscendingDNA change genomic hg19</th>
                        <th>GERP</th>
                        <th>dbSNP ID</th>
                        <th>number_in_normal</th>
                        <th>Freq</th>
                        <th>Sources</th>
                        </tr>

                <tbody>"""
        for row in c.execute("""SELECT * FROM pathogenic_prob;"""):
            response+="""<tr>"""
            for column in row:
                response += """<td> """+column+"""</td>"""
            response+="""</tr>"""


    response+="""</tbody></table>"""
    response+="""</div>"""
    return response

#response+=print_table("pathogenic_prob",response, c)
#response+=print_table("patient_nucleabase",response , c)

form = cgi.FieldStorage()
response+=print_table(form.getvalue("tableSelection"),response, c)
#response+=print_table(form.getvalue("optionSelectedId"),response, c)
#response+=print_table("patient_nucleobase",response, c)
#response+="</div></div></body></html>"
print(response)
sys.exit(0)

