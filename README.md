# NSI-SqliteOnline

Here are just a few files to build exercices on SQL DB. It is powered by [SQLite compiled to JavaScript](https://sql.js.org/).
There are a few examples available [here online](http://nsi.colbert.bzh/sql).

Just add two files into the folder named `TP`:

- A SQLite file with `".sql"` extension to initialize the database ;
- A HTML file with `".html"`, extension for the text of the exercice (see instructions below).

Then just use a link such as `tp.html?text=htmlFileName&db=sqlFileName`, which loads both files (for instance: `tp.html?html=locations_1&db=locations`). Good Luck.

## Spécificités des fichiers HTML

Les questions sont définies dans des `<div>` de classe `question` incluant de manière optionnelle une solution dans un `<pre>` de classe `response`. Dans le cas de réponse à fournir sous forme de phrase, il faut ajouter la classe `text`, comme dans les exemples ci-dessous :

```html
<div class='question sql'>
Déterminez le nombre de voitures que vous possédez.
<pre class='response'>SELECT COUNT(*) FROM Vehicules</pre>
</div>

<div class='question text'>
Quel ordre de grandeur peuvent atteindre les bases de données actuelles ?
<pre class='response'>Le pétaoctet. Un pétaoctet vaut un million de milliards d’octets.</pre>
</div>
```

## Licence
Ces données sont mises à disposition selon les termes de la [Licence Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/).
