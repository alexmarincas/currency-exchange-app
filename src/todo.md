
Web Developer - Test candidati

Iti multumim ca ai ales sa aplici pentru o pozitie in cadrul companiei Neusoft! 
Pentru un proces de recrutare cat mai corect si oferirea unei sanse egale fiecarui candidat, te rugam  sa dezvolti o mica aplicatie in vederea evaluarii cunostintelor tale.

Aplicatia se va numi "Currency Exchange" si va trebui sa ofere posibilitatea de a adauga / sterge diverse valute, introduce o suma pentru a putea fi convertita la schimbul valutar al zilei curente in valutele selectate si sa afiseze rata de schimb a fiecarei valute in raport cu valuta initiala (cea in care am introdus suma). Pentru a avea acces la aceste informatii ne vom folosi de API-ul public oferit de catre Banca Centrala Europeana din acest link: "https://exchangeratesapi.io/ ". Tine cont ca este gratuit in limita a 250 de requesturi ,  daca nu te incadrezi ar fi o idee buna sa mockuiesti date pentru development dupa ce esti sigur de structura response-ului.

Pentru acest proiect poti folosi orice tehnologii dorite. Stilizarea poate fi facuta cu CSS simplu sau daca doresti orice preprocesor precum SASS sau LESS, iar codul de JavaScript poate fi Vanilla sau oricare dintre frameworkurile React sau Vue, cu sau fara Typescript.

Va fi un singur screen principal care va trebui sa fie responsive pentru ca utilizatorul sa aiba parte de o
experienta placuta atat pe desktop cat si mobile. Ca si structura tine cont de urmatoarele lucruri:
- fiecare valuta va fi incadrata intr-un "card" care va contine urmatoarele:
1. Simbolul valutei.
2. Steagul tarii / comunitatii ce foloseste valuta.
3. Abrevierea valutei urmata de denumirea completa a acesteia.
4. Un input in care utilizatorul va putea introduce un numar pentru a fi convertit in alte valute.
5. Un text in care se va afisa rata de schimb a valutei respective raportata la valuta initiala (cea in care utilizatorul a introdus o suma -> de ex.: in valuta de EUR utilizatorul introduce suma de 100; in cardul de USD va aparea urmatoarea informatie: 1 EUR = 1.2131 USD).
6. fiecare card va avea si un buton mic (un X) care va sterge valuta respectiva din UI.
- va trebui afisata data de referinta pentru valorile schimbului valutar (alege data curenta) undeva sus in pagina pentru ca utilizatorul sa vada ca ratele de schimb sunt pentru o anumita data.
- vei avea un buton de "Add currency" care odata selectat va afisa o lista cu numeroase alte valute sub forma unui Modal afisat deasupra screenului. In aceasta lista fiecare valuta va avea steagul tarii, abrevierea valutei si numele complet al acesteia. Se doreste de asemenea ca sa poata fi selectate mai multe valute (odata selectate fa o modificare vizibila pe UI pentru a arata utilizatorului ca a fost selectata) iar abia dupa aceea sa apesi din nou butonul de Add Currency pentru a inchide lista si bineinteles a adauga valutele selectate in screenul principal. In cazul unui click in exteriorul Modalului cu Lista de Valute, acesta se va inchide.

Atasat acestui document vei gasi un UI de referinta atat pentru desktop cat si pentru mobile. Acesta este pentru a te ajuta si a- ti face o idee despre structura aplicatiei, insa ai libertatea de a improviza daca asa consideri.

Pentru a putea folosi API-ul cu ratele de schimb vei fi nevoit sa iti faci un cont in urma caruia vei primi un API KEY ce il vei folosi in requesturi. Citeste documentatia aici (https://exchangeratesapi.io/documentation/) si decide singur de care endpointuri ai nevoie.

Concluzii:

Presupune ca aplicatia scrisa de tine va fi trimisa in productie si va fi accesibila unor utilizatori reali, asa ca ne asteptam la "production ready code". Foloseste sintaxa moderna de JavaScript, comenteaza si documenteaza codul, foloseste orice orice librarie externa doresti si orice tool-uri consideri ca te vor ajuta in procesul de development.
Foloseste Github sau orice alt serviciu de Repository Hosting doresti pentru a ne putea impartasi un link cu Repository-ul odata ce ai finalizat aplicatia. Include pasii de configurare necesari si asigura- te ca vom putea porni aplicatia.
Ne dorim ca procesul de recrutare sa fie unul corect si ca toti participantii sa aiba parte de acelasi start, asa ca te rugam sa nu impartasesti cu  alte persoane sau sa nu publici acest test.
Pentru eventuale intrebari ne poti contacta pe email la adresa “hello@neusoft.ro”.
Asteptam cu nerabdare sa ne uitam peste munca facuta de tine!

Liviu Tomesc - Engineering Manager at Neusoft EDC

Natalia Muresan – HR Manager at Neusoft EDC