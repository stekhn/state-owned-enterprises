# import re


# with open("/Users/schnucko/workspace/mittelbar.csv") as f:
#     data = {}
#     for line in f:
#         nr = re.search(r'\d+', line)
#         if nr != None:
#           print nr.group()
#           print data


import csv
import re

ifile  = open('./mittelbar.csv', "rb")
reader = csv.reader(ifile)

ofile  = open('./output.csv', "wb")
writer = csv.writer(ofile, delimiter=',', quotechar='"', quoting=csv.QUOTE_ALL)

# data = ['3','A & T Motor Retailing','Verkauf von','1.505.000','1.505.000','100','Broadwood Finance']
data = ['','','','','','','']

rownum = 0

for row in reader:

      nr = re.search(r'\d+', row[0])
      if nr != None:
        print data
        writer.writerow(data)
        data = ['','','','','','','']


      colnum = 0
      for col in row:
          #print col
          if col == '':
            data[colnum] = data[colnum] + str(col)
          else:
            data[colnum] = data[colnum] + str(col) + ' '
          colnum += 1
      #print '\n'
      rownum += 1

ifile.close()
ofile.close()

