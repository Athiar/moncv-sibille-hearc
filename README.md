Projet "moncv" de Nicolas Sibille
================================

Ce projet a pour but de découvrir les outils de technologies web.

Installation des outils nécessaires :
-------------------------------------
Installez :
 - [Visual Studio Code](https://www.google.ch/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiOkdiHgs7XAhWHfhoKHeK-DfYQFggnMAA&url=https%3A%2F%2Fcode.visualstudio.com%2F&usg=AOvVaw15O90sm1ios8AUpw56hCml) qui sera notre IDE pour développer notre projet web.
 - [Git](git-scm.com) pour gérer les versions de notre projet.
 - [Node.JS](https://nodejs.org/) pour pouvoir développer des projets avec la technologie Node.js (plateforme javascript pour client et serveur).
 - Ouvrez le terminal dans Visual Studio Code et installez Interface en ligne de commande de Vue.js : 
	`$ npm install -g vue-cli`

Création de la base du projet
------------------
Création d'un nouveau projet avec le template :
```bash
vue init webpack moncv
```
Le programme vous posera plusieurs question pour connaître la configuration désirée du projet. Indiquez le nom du projet, sa description, son auteur. Puis "standalone" pour *Vue build*, "No" pour install vue-router, "Yes" pour *Use ESLint*, "Standard" pour *Pick an ESLint preset*, "No" pour *Setup unit tests with Karama + Mocha* et "No" pour *Setup e2e tests with Nightwatch*.
Installez ensuite les dépendences nécessaires :
```bash
npm install
```
Supprimez *src/components* et le fichier *src/App.vue* de votre projet pour désinstaller Vue.js :
```bash
npm uninstall vue --save
```
Si vous utilisez Vue.js, installez via l'interface graphique le plugin Vetur pour le contrôle syntaxique et le formatage des fichiers sources. Puis, dans *Fichier, Préférences, Paramètres*, recherchez *eslint.validate* et ajouter les lignes de configurations suivantes dans les settings utilisateur pour qu'eslint valide nos fichiers Vue. :
```
    "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue" ]
```
La base de votre projet est prête, vous pouvez tester le fonctionnement de sa version de développement (locale).
```bash
npm run dev
```
Configurations de base du projet
-------------
Pour que l'éditeur nous affiche des erreurs lorsque notre code est mal indenté, qu'il manque des points-virgules, ou qu'il manque une ligne vide à la fin d'un fichier sources; Ajoutez dans le fichier *.eslintrc.js* :
```javascript
{
	...,
	"rules": {
		// enforce semi
		"semi": ["error", "always"],
		// use 4 spaces indent
		"indent": ["error", 4],
		// make rule equal vs code auto formatting
		"space-before-function-paren": ["error", {
			"anonymous": "always",
			"named": "never"
		}],
		...
	},
	...
}
```
Pour que l'éditeur prenne par défaut 4 indentation, ajoutez dans el fichier *.editorconfig* :
```
indent_size = 4
```
Dans le fichier *build/webpack.dev.conf*, corrigez la configuration de webpack pour le debugging :
```
devtool: 'source-map',
```
Créez un fichier .gitattributes à la racine pour indiquer à GIT quels fichiers sont binaires, ainsi que le caractère utilisé pour les fins de ligne.
```
# Force all line endings to be \n
* text eol=lf
############################################################
# git can corrupt binary files if they're not set to binary.
############################################################
# Apple office documents are actually folders, so treat them as binary.
*.numbers binary
*.pages binary
*.keynote binary
# Image files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.webp binary
*.ico binary
# Movie and audio files
*.mov binary
*.mp4 binary
*.mp3 binary
*.flv binary
*.ogg binar
# Compression formats
*.gz binary
*.bz2 binary
*.7z binary
*.zip binary
# Web fonts
*.ttf binary
*.eot binary
*.woff binary
*.otf binary
# Other
*.fla binary
*.swf binary
*.pdf binary
############################################################
# End binary settings
############################################################
```
Ajoutez dans le fichier *src/main.js* ces 2 lignes qui permettent d'inclure  :
```javascript
import 'bootstrap.native';
import 'bootstrap-css-only/css/bootstrap.min.css';
```
Gestion du projet avec GIT
--------------------------
Git est un outil libre et gratuit permettant de gérer facilement les versions d'un projet lorsque plusieurs personnes travaillent dessus.
Une fois installé, connectez-vous avec votre compte GitHub sur le logiciel GIT. Nous allons par la suite pousser le projet sur l'espace du groupe GitHub qui a été crée pour notre classe, vérifiez donc que vous y avez accès (ou que vous avez un autre endroit pour le mettre en ligne).
Positionnez-vous dans le dossier de votre projet et entrez la commande suivante pour créer un repository git :
```bash
# Crée le repository git dans le dossier actuel :
git init
# Défini le serveur distant pour notre repository :
git remote add origin https://github.com/heg-web/moncv-sibille-hearc.git
# Installe un plugin qui poussera les commits sur la bonne branche :
npm install push-dir --save-dev
```
Rajoutez ces quelques lignes dans le fichier *package.json* pour que nous puissions utiliser la commande *npm run deploy* qui permettra de pousser les modifications sur notre branche gh-pages :
```javascript
"scripts": {
...,
"deploy": "push-dir --dir=dist --branch=gh-pages --cleanup --verbose"
},
```
Pour commiter le projet :
```bash
# Compile le projet :
npm run build
# Ajoute les fichiers modifiés au stage :
git add . --all
# Commit les modifications avec un message parlant :
git commit -m 'message à propos du commit'
# Envoie le commit sur la branche "pages" (d'après notre configuration) :
npm run deploy
# Envoie les modifications au serveur (par exemple la branche master). Les prochaines fois, faire juste "git push" car les même paramètres seront utilisés grâce au -u :
git push -u origin master
```
Autres  commandes git qui pourraient être utiles :
```bash
# Affiche l'état des fichiers dans git (par exemple modifiés ou non depuis le dernier commit) :
git status
# Affiche l'historique des commits :
git log
# Télécharge les commit distants :
git pull
# Change de branche :
git checkout
# Copy un repository distant (à utiliser par exemple si vous voulez copiez ce projet en local) :
git clone
# Affiche les diverses branches ou en crée une si spécifié
git branch
```
Ajout de Bootstrap
------------------
Bootstrap est un framework web permettant de simplifier le développement d'un site web. De nombreux composants sont directement utilisables . Bootstrap simplifie l'implémentation de pages web mobile-first grâce à un système avancé de grille qui s'adapte en fonction de la taille de l'écran du client.
Pour ajouter Bootstrap dans notre projet :
```bash
npm install bootstrap-css-only@3 --save
npm install bootstrap.native --save
```
Nous pouvons ensuite utiliser nos classes Bootstrap pour adapter le design de notre page. Petit exemple de 3 petites boites html qui se s'ajustent en fonction de la largeur de la page affichée :
```html
<div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
```

Dans notre projet de CV, il sert également à afficher des progress-bar quand le javascript n'est pas activé, à vérifier les informations du formulaire, styliser la page, etc.
Pour plus d'informations sur Bootstrap : https://getbootstrap.com/docs/3.3/

Chart.js
--------
Dans notre projet nous utilisons déjà [jQuery](https://jquery.com) (bibliothèque javascript), qui est un pré-requis pour le plugin [Chart.js](https://www.npmjs.com/package/chart.js). Cette librairie permet d'afficher des graphiques sur notre page via du code Javascript. Ici, nous avons transformé nos progress-bar en graphiques en cercle.
Installe le package Chart.js via npm :
```bash
npm install chart.js --save
```
Puis incluez-le dans votre projet :
```javascript
import Chart from 'chart.js';
```
Pour faire en sorte que toutes les progress-bar de la page se transforme en graphique après le chargement, ajoutez ce code dans le fichier *main.js* ((dans la fonction *$(document).ready(()*). Il permet de définir les options de nos charts :
```javascript
$('.progress-bar').each((i, progressbar) => {
        const ctx = $(progressbar).parent()[0].getContext('2d');
        window.myDoughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        $(progressbar).attr('aria-valuenow'), (100 - $(progressbar).attr('aria-valuenow'))
                    ],
                    backgroundColor: ['#428bca', 'rgba(0, 0, 0, 0.0)'],
                    hoverBackgroundColor: ['#63a8e2', 'rgba(0, 0, 0, 0.0)'],
                    borderColor: ['#052d4f', 'rgba(0, 0, 0, 0.0)']
                }]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                tooltips: {
                    enabled: false
                },
                title: {
                    display: true,
                    text: $(progressbar).text(),
                    fontSize: '20'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                layout: {
                    padding: {
                        bottom: 20
                    }
                }
            }
        });
    });
```
Ce [code javascript](https://jsfiddle.net/cmyker/ooxdL2vj/) (également placé dans le *$(document).ready(()*) permet d'afficher le pourcentage de chaque progressbar à l'intérieur du 
```javascript
Chart.pluginService.register({
        beforeDraw: function (chart) {
            var width = chart.chart.width;
            var height = chart.chart.height;
            var ctx = chart.chart.ctx;
            ctx.restore();
            var fontSize = (height / 90).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.textBaseline = 'middle';
            var text = chart.chart.data.datasets[0].data[0] + '%';
            var textX = Math.round((width - ctx.measureText(text).width) / 2) + 3;
            var textY = (height / 2) + 17;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    });
```
Plugin Telegram
---------------
Pour pouvoir tester npm avec d'autres plugins javascript, j'ai installé le module *messaging-api-telegram* qui permet d'utiliser l'API de [Telegram](telegram.org). J'ai utilisé le formulaire que j'avais préalablement fait en HTML sur la page de mon CV pour faire en sorte que ça m'envoie un message privé sur Telegram. C'est plus facile que de faire un envoi par email car cela ne nécessite pas de serveur SMTP. Pour que notre package fonctionne, il faut avoir en sa possession (token d'accès) un bot Telegram (peut être crée facilement avec en contactant [@BotFather](https://telegram.me/BotFather)).
```javascript
// initialise le module TelegramClient 
const { TelegramClient } = require('messaging-api-telegram');
// Changez la chaine par l'accessToken de votre bot :
const client = TelegramClient.connect('12345678:AaBbCcDdwhatever');
// Envoie un message Telegram à une personne (remplacez le CHAT_ID par votre n° d'identification Telegram) :
client.sendMessage(CHAT_ID, 'hi');
```
Vu que l'IDE affiche désormais une erreur lors de la compilation `via npm run build` j'ai dû désactivé UglifyJs qui permettait de rendre moins lisible notre code pour les humains une fois publié. En effet, Uglify ne semble pas reconnaître une nouvelle syntaxe utilisée par notre plugin Telegram. Dans le fichier *webpack.prod.conf.js*, commentez les lignes suivantes :
```javascript
// new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
```
