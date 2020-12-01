# NSI-SqliteOnline

<p>Here are just a few files to build exercices on SQL DB. It is powered by <a href="https://sql.js.org/">SQLite compiled to JavaScript</a>. There are a few examples available <a href="http://nsi.colbert.bzh/sql">here.</a></p>
<p>Just add two files into the folder named TP<p>
<ul>
<li>a sqlite file width ".sql" extension to init the database</li>
<li>a html file width ".html" extension for the text of the exercice</li>
</ul> 
<p>Then just use a link such as tp.html?text=htmlFileName&db=sqlFileName (for instance tp.html?html=locations_1&db=locations</p>
Good Luck.
<br><br>
Ces données sont mises à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Licence Creative Commons Attribution 4.0 International</a>

<h4>Spécificités des fichiers html</h4>
<p>Les questions sont définies dans des 'div' de classe 'question' incluant de manière optionnelle une solution dans un 'pre' de classe 'response'. Dans le cas
de réponse à fournir sous forme de phrase, il faut ajouter la classe 'text'</p>

<p>&lt;div class='question'&gt;<br />D&eacute;terminez le nombre de voitures que vous poss&eacute;dez.<br />&lt;pre class='response'&gt;SELECT COUNT(*) FROM Vehicules&lt;/pre&gt;<br />&lt;/div&gt;<br /><br/>&lt;div class='question text'&gt;<br />Quel ordre de grandeur peuvent atteindre les bases de donn&eacute;es actuelles ?<br />&lt;pre class='response'&gt;Le p&eacute;taoctet. Un p&eacute;taoctet vaut un million de milliards d&rsquo;octets.&lt;/pre&gt;<br />&lt;/div&gt;</p>

