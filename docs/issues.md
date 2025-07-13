TO-DO-LISTE:

- Auf der Seite my-games soll es keinen direkten Bibliotheksimport mehr geben, sondern eine verlinkung zu der Profilseite. Hier soll man die möglichkeit haben seine Bibliotheken zu verknüpfen. Momentan gibt es nur Steam. Hier soll man seine Profil-ID eintragen können, welche dann mit dem user verknüpft wird. Beim laden der Seite my-games sollte es dann nur die möglichkeit geben, seine Bibliotheken zu aktualisieren, wodurch alle Bibliotheken neu angefragt und Änderungen übernommen werden.
- Alle "console.log()" Ausgaben von überall entfernen, damit die Anwendung bereit für Production ist
- Auf der Deal-Seite gibt es einige Probleme im Frontend:
  - Der höchste Rabatt wird mit vielen Nachkommastellen angezeigt aber sollte nur max. 2 Nachkommstellen anzeigen.
  - Für die Stores gibt es noch keine Filterfunktion. Hier werden von den Deals Storenamen bereitgestellt. Über die Cheapshark API kann man alle verfügbaren Stores laden und anhand der Namen abgleichen. Diese bieten ebenfalls Icons der Stores.
  - Die Deal karten haben in der oberen linken Ecke den Namen des Stores. Dies soll aber durch das Icon des Stores ausgetauscht werden.
  - Die funktion "Besitze ausblenden" funktioniert noch nicht. Dafür muss das mit dem Deal verknüpfte Spiel überprüft werden, ob es in den Usergames des Users vorhanden ist.
  - Die Veränderung der Kartenansicht (groß, klein, liste, ...) sollte sich im filter unten auf der rechten seite befinden. so ist es auch auf der seite my-games. die konsistenz soll bewahrt bleiben.
  - Die Genres der Deals sollen so wie bei den Game-Cards designt sein. Falls es viele Genres sind verschiebt sich der untere Button. Deshalb soll der Button immer am unteren Rand der Karte sein, so dass alle Deal-Karten ähnlich formatiert sind.
- Bei der Navigationsleiste soll die Vergrößerung bei Hover etwas verzögert werden, so dass die User Experience besser ist. Man benötigt nicht immer, dass sie direkt ausfährt, sondern nur falls man etwas genauer nachlesen möchte. Dafür kann man den Mauszeiger etwas länger darauf halten.
- In der Navigationsleiste soll es nur noch die Hauptnavigationspunkte geben und keine Unterpunkte mehr (nur noch Angebot statt "Alle Angebot", "Kostenlose Spiele", "Höchste Rabatte")
- Die Suche (suchleiste im Header) funktioniert schon gut aber muss noch deutlcih verbessert werden.
  - Es sollen bereits ergebnisse ab 2 zeichen angezeigt werden
  - Wenn keine Ergebnisse gefunden werden, soll direkt im Preview "Keine Ergebnisse" angezeigt werden.
  - Die Suche soll sich grundsätzlich nur auf den Namen (Titel des Spiels) fokussieren. Auf der Suchseite könnte man noch eine Advanced Search anbieten, bei der man auswählen kann, ob man nach anderen Attributen suchen möchte.
  - Auf der Suchseite werden Spielekarten dargestellt. Hier wird jedoch aus der Seite my-games die usergames eingebunden. Das sollte verändert werden, so dass hier nur die Games angezeigt werden. Hier könnte man eine Konstante definieren, die angibt, ob der User das Spiel in seiner Bilbliothek besitzt. Falls Ja, können die Details des UserGames (Notizen, Playtime, etc.) angezeigt werden. Dafür sollte die Game Detailseite gut in diese Abschnitte strukturiert werden.
- Auf die Detailseite der Spiele sollen ebenfalls zugehörige Deals angezeigt werden. Dafür soll zuerst die Datenbank der Deals mit zugehöriger GameID durchsucht werden und anschließend die API mit dem Titel des Spiels abgefragt werden. Die Antwort der API soll dann anschaulich auf der Dealseite dargestellt werden. Falls Preisdaten übergeben werden (History), wäre eine grafische Darstellung fantastisch.
