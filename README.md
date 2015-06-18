# ExchangeRobot

ExchangeRobot permet aux utilisateus d'obtenir les taux d'échange de monnaie en combinaison avec un service de Open Exchange Rates.

## Utilisation

Le bot prédéfinit deux cas possible : 
* Le format de twit est bien formé. On renvoit le taux d'échange de monnaie défini direcetement.
* Le format de twit ne correspond pas au règle. On renvoit un twit d'instruction.

Pour bien former le twit, il faut respecter les règle ci-dessous:
* Le twit doit contient au minimum le montant à changer, les deux types de monnaies.
* Il faut mettre le montant plus : plus monnaie à changer (tous en majuscule) plus TO plus monnaie d'échange (tous en majuscule)
* La partie au-dessus doit commencer et terminer par -.

Exemple :
  -100:USD TO EUR-
  (Combien d'euros équale à 100 dollars)
  
Une fois que le twit est détecté, le bot enverra la réponse comme : 100 USD in EUR: 90.678273

Si le twit n'est pas bien formé, le bot enverra la réponse d'instruction : 
  Tips : try something like "-100:EUR TO USD-" that means 100 euros in how much dollars. Attention: All in upper case
