#!/usr/bin/python

import sqlite3, csv

# use your column names here


con = sqlite3.connect("mito.db")
cur = con.cursor()
#cur.execute("CREATE TABLE IF NOT EXISTS  patient_nucleobase "+str(tuple(cols))+";")
#cur.execute("ALTER TABLE patient_nucleobase ADD CONSTRAINT patient_primary PRIMARY KEY (seq, pos);")
#cur.execute("DROP Table IF EXISTS patient_nucleobase;")
#cur.execute("CREATE TABLE IF NOT EXISTS patient_nucleobase (patient_id,seq,pos,left_flank,ref_allele,right_flank,Variant,Cov_variant_minus,Cov_minus,Cov_variant_plus,Cov_plus,freq_variant_minus,freq_variant_plus);")
#cur.execute("DROP Table IF EXISTS pathogenic_prob;")
#cur.execute("CREATE TABLE IF NOT EXISTS pathogenic_prob (Variant_ID,Type,AscendingDNA_change_genomic_hg19,GERP,dbSNP_ID,number_in_normal,freq,Sources);")
#cur.execute("""SELECT name, sql FROM sqlite_master WHERE type="table" AND name = "patient_nucleobase";'""")


cur.execute("""PRAGMA table_info(patient_nucleobase)""")
response="""{"tableNames":" """
for row in cur.execute("""PRAGMA table_info(patient_nucleobase)"""):
	#response+="""<tr>""
	response += row[1]+","
	#response+="""</tr>"""

response = response[:len(response)-1]
response+=""" " }"""
print(response)
#read_csv_todb('di_47_p4.filt.var.csv','patient_nucleobase' ,cur)
#read_csv_todb('di_47_pe.filt.var.csv','patient_nucleobase' , cur)
#read_csv_todb('di_80_hfd.filt.var.csv','patient_nucleobase' , cur)
#read_csv_todb('pathogenic.csv','pathogenic_prob' , cur)
#read_csv_todb('pathogenic_prob.csv','pathogenic_prob' , cur)

con.commit()
con.close()
