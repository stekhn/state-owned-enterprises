import scraperwiki
import urllib2, lxml.etree
from HTMLParser import HTMLParser

url = 'https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Bundesvermoegen/Privatisierungs_und_Beteiligungspolitik/Beteiligungspolitik/Beteiligungsberichte/beteiligungsbericht-des-bundes-2015.pdf?__blob=publicationFile&v=6'
#url = 'http://localhost:8008/mittelbar.pdf'

pdfdata = urllib2.urlopen(url).read()
xmldata = scraperwiki.pdftoxml(pdfdata)
root = lxml.etree.fromstring(xmldata.encode('utf-8'))

pages = list(root)

#skiplist=['COUNTRY','FACTORY NAME','ADDRESS','CITY','REGION']
# for page in pages[5]:
#   for el in page:
#     data = {}
#     #print data
#     if int(el.attrib['top']) > 150 and el.tag == "text": #and el.text not in skiplist
#       if int(el.attrib['left']) < 100: data = { 'Company': el.text }
#       elif int(el.attrib['left']) < 300: data['Object'] = el.text
#       elif int(el.attrib['left']) < 520: data['Capital'] = el.text
#       elif int(el.attrib['left']) < 630: data['ShareAbs'] = el.text
#       elif int(el.attrib['left']) < 665: data['ShareRel'] = el.text
#       else:
#         data['Shareholder'] = el.text
      
       

print HTMLParser().unescape(lxml.etree.tostring(root, pretty_print=True))
#print pdfdata
