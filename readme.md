# State-O

**State-O** is a database and search engine for state owned companies. A prototype by <a href="http://br.de/data">BR Data</a> for the <a href="http://globaleditorsnetwork.org">Global Editors Hackathon</a> at <a href="http://sz.de">Süddeutsche Zeitung</a>, 2016.

### Why?
Information about publicly owned companies and public private partnerships is many times hidden in PDFs published by government bodies, city councils or other public sources, making it difficult for investigative journalists to search for them in a single place. However, there are many known cases of state-owned or partially state-owned companies being involved in scandals and shady business. For example, [a subsidiary of German public bank KfW is shareholder of Cayman Island trust companies](http://www.tagesspiegel.de/wirtschaft/millionen-im-paradies-kfw-tochter-deg-investiert-in-steueroasen/13686554.html).

### How?
State-O aims to shed light on stated-owned enterprises and offers information in a simple searchable database. The goal is to build a company database of state-owned enterprises all over Europe.

![Screenshot](https://raw.githubusercontent.com/stekhn/state-owned-enterprises/master/screenshot.png)

### Scale
In the first draft, State-O uses information on companies controlled directly or indirectly by the German federal government, [published by the Federal Ministry of Finance in PDF format](https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Bundesvermoegen/Privatisierungs_und_Beteiligungspolitik/Beteiligungspolitik/Beteiligungsberichte/beteiligungsbericht-des-bundes-2015.pdf?__blob=publicationFile&v=6).

Also direct ownership of corporates by the Austrian federal government is part of the already scraped dataset: https://www.bmf.gv.at/budget/das-budget/Ausgliederungen_und_Beteiligungen_des_Bundes_Oktober_2015.pdf?5i7zdn

Other sources from European state Governments, regional Governments and city councils can be added in the future.

### Setup
State-O depends on [Node.js](https://nodejs.org/) and a running [MongoDB](https://www.mongodb.com/) instance.

1. Clone repository `git clone git@github.com:stekhn/state-owned-enterprises.git`
2. Download required dependcies `npm install`
3. Import dataset `node import.js` to MongoDB
4. Start webserver and search service `node run start`
6. Open the search http://localhost:8080/search/

### Data extraction
The dataset is currently imported from a CSV-File which contains an entry for each state and each enterprise in the universe of state owned enterprises. 

DISCLAIMER: Please don't rely on this CSV-File right now since it still contains mistakes and is not reliable right now !!!

In the case of Germany, a PDF from the Ministery of Finance was extracted with tabula and split into direct and indirect ownerships (direct_ownership.csv, indirect_ownership.csv). Poppler/pdftohtml (scrape-pdf.py) unfortunately did not give better results. Since parts of the PDF are messy, a script (merges-lines.py) merges entries which where split over several lines in the original document. Establishing a final version of the dataset still requires therefore some data tidying and cleaning. The R-Script build-links.R sketches a way to merge direct and indirect ownerships.

### Possible improvements
- Most logic should be done server-side (nice URLs, better search engine visibillity, cacheable) 
- Use a real graph database
- Use `undefined` for importing empty cells 
- Add Docker config for simple deployment
