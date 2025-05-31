### 🔄 Projektbewusstsein & Kontext

- **Beachte** dass du die Anwendung niemals starten sollst, da das Testen deiner Ergebnisse immer von mir ausgeht.

- **Lese immer `PLANNING.md`** zu Beginn eines neuen Gesprächs, um die Architektur, Ziele, den Stil und die Einschränkungen des Projekts zu verstehen.

- **Überprüfe `Tasks.md`**, bevor Sie eine neue Aufgabe beginnen. Wenn die Aufgabe nicht aufgeführt ist, fügen Sie sie mit einer kurzen Beschreibung und dem heutigen Datum hinzu.

- **Nutze Context7 MCP**, wenn du mit externen Technologien arbeitest, um die neuste Dokumentation zu verstehen.

- **Verwende konsistente Namenskonventionen, Dateistrukturen und Architekturmuster**, wie in `PLANNING.md` beschrieben.

### 🧱 Codestruktur & Modularität

- **Erstelle niemals eine Datei, die länger als 500 Codezeilen ist.** Wenn eine Datei diese Grenze erreicht, führen Sie eine Refaktorierung durch, indem Sie sie in Module oder Hilfsdateien aufteilen.

- **Organisieren Sie Code in klar getrennte Module**, gruppiert nach Funktion oder Verantwortung.

- **Verwenden Sie klare, konsistente Imports** (bevorzugen Sie relative Imports innerhalb von Paketen).

### ✅ Aufgabenerledigung

- **Markieren Sie abgeschlossene Aufgaben in `Tasks.md`** sofort nach Abschluss.

- Fügen Sie neue Unteraufgaben oder TODOs, die während der Entwicklung entdeckt wurden, unter einem Abschnitt "Entdeckt während der Arbeit" zu `Tasks.md` hinzu.

### 📎 Stil & Konventionen

- **Verwenden Sie TypeScript** als primäre Sprache.

### 📚 Dokumentation & Erklärbarkeit

- **Aktualisieren Sie `README.md`**, wenn neue Funktionen hinzugefügt werden, sich Abhängigkeiten ändern oder Setup-Schritte modifiziert werden.

- **Kommentieren Sie nicht offensichtlichen Code** und stellen Sie sicher, dass alles für einen Entwickler mittleren Niveaus verständlich ist.

- Fügen Sie beim Schreiben komplexer Logik einen **Inline-`# Grund:`-Kommentar** hinzu, der das Warum erklärt, nicht nur das Was.

### 🧠 KI-Verhaltensregeln

- **Nehmen Sie niemals fehlenden Kontext an. Stellen Sie Fragen, wenn Sie unsicher sind.**

- **Halluzinieren Sie niemals Bibliotheken oder Funktionen** – verwenden Sie nur bekannte, verifizierte Pakete.

- **Bestätigen Sie immer Dateipfade und Modulnamen**, bevor Sie sie in Code oder Tests referenzieren.

- **Löschen oder überschreiben Sie niemals vorhandenen Code**, es sei denn, Sie werden ausdrücklich dazu aufgefordert oder es ist Teil einer Aufgabe aus `TASK.md`.
