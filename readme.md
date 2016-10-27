# State-O

**State-O** is a aatabase and search engine for state owned companies. A prototype by <a href="http://br.de/data">BR Data</a> for the <a href="http://globaleditorsnetwork.org">Global Editors Hackathon</a> at <a href="http://sz.de">Süddeutsche Zeitung</a>, 2016.

### Why?
Information about publicly owned companies and public private partnerships is many times hidden in PDFs published by government bodies, city councils or other public sources, making it difficult for investigative journalists to search for them in a single place. However, there are many known cases of state-owned or partially state-owned companies being involved in scandals and shady business. For example, [a subsidiary of German public bank KfW is shareholder of Cayman Island trust companies](http://www.tagesspiegel.de/wirtschaft/millionen-im-paradies-kfw-tochter-deg-investiert-in-steueroasen/13686554.html).

### How?
State-O aims to shed light on stated-owned enterprises and offers information in a simple searchable database. The goal is to build a company database of state-owned enterprises all over Europe.

### Scale
In the first draft, State-O uses information on companies controlled directly or indirectly by the German federal government, [published by the Federal Ministry of Finance in PDF format](https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Bundesvermoegen/Privatisierungs_und_Beteiligungspolitik/Beteiligungspolitik/Beteiligungsberichte/beteiligungsbericht-des-bundes-2015.pdf?__blob=publicationFile&v=6). Other sources from European state Governments, regional Governments and city councils can be added in the future.

### Installation
State-O depends on [Node.js](https://nodejs.org/) and a running [MongoDB](https://www.mongodb.com/) instance.

1. Clone repository `git clone git@github.com:stekhn/state-owned-enterprises.git`
2. Download required dependcies `npm install`
3. Import dataset `node import.js` to MongoDB 
4. Start database search service `node service/service.js`
5. Start webserver for the search interface `node run start`
6. Open the search http://localhost:8080/search/

### Possible improvements
- Use a real graph database
- Add Docker config for simple deployment
