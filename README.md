# Let's Art Barbershop — strona wizytówka

Gotowa, jednostronicowa strona-wizytówka (mobile-first, ciemny motyw, animacje, PL/EN).
Czysty **HTML + CSS + JavaScript** — bez frameworków, bez budowania. Otwórz w VS Code / Claude Code i edytuj.

---

## 📁 Struktura plików

```
.
├── index.html        ← główny plik strony (cała treść tutaj)
├── css/
│   └── style.css      ← style, motyw kolorów, animacje
├── js/
│   └── app.js         ← animacje przy scrollu, parallax, przełącznik PL/EN, liczniki
├── image-slot.js      ← komponent pól na zdjęcia (patrz uwaga niżej!)
└── assets/
    └── logo.jpeg      ← logo salonu
```

---

## ▶️ Uruchomienie lokalnie

Najprościej — w VS Code zainstaluj rozszerzenie **Live Server**, kliknij prawym na `index.html` → *Open with Live Server*.

Albo z terminala (jeśli masz Pythona):
```bash
python3 -m http.server 8000
# potem otwórz http://localhost:8000
```
> Otwieranie pliku przez `file://` (dwuklik) też zadziała, ale Live Server / serwer lokalny jest pewniejszy (mapa, sloty).

---

## ✏️ Edycja treści

Prawie wszystko jest w `index.html`:

- **Cennik** — sekcja `<!-- SERVICES / PRICING -->`. Każda usługa to blok `.svc` (nazwa, cena, czas).
- **Opinie** — sekcja `<!-- REVIEWS -->`. To **przykładowe** cytaty — podmień na prawdziwe z Booksy.
- **Godziny otwarcia** — sekcja `<!-- MAP / VISIT -->`, tabela `.hours`. Obecnie **przykładowe** (Pn–Pt 10–18, Sob 9–15). Wpisz prawidłowe.
- **Adres / telefon / Booksy** — wyszukaj w pliku `733 451 488`, `Kompozytorów`, `booksy.com` i podmień w razie potrzeby.
- **Instagram** — w stopce (`<!-- FOOTER -->`) link `https://www.instagram.com/` — wstaw adres profilu.

### Dwa języki (PL / EN)
Teksty mają atrybuty `data-pl="..."` i `data-en="..."`. Przełącznik w pasku górnym podmienia treść. Edytując tekst, zmień **oba** atrybuty.

---

## 🖼️ WAŻNE: zdjęcia (pola `<image-slot>`)

Pola na zdjęcia (`<image-slot>`) działały w edytorze, w którym powstała strona, ale **na zwykłym hostingu nie da się na nie przeciągać zdjęć**. Przed publikacją zamień je na zwykłe obrazki:

1. Wrzuć zdjęcia do folderu `assets/` (np. `assets/galeria-1.jpg`).
2. Zamień w `index.html`, np.:

```html
<!-- BYŁO -->
<image-slot id="cut-1" style="height:200px" shape="rounded" radius="16" placeholder="fade"></image-slot>

<!-- ZRÓB TAK -->
<img src="assets/galeria-1.jpg" alt="Fade"
     style="width:100%;height:200px;object-fit:cover;border-radius:16px;display:block" />
```

Dotyczy pól w sekcjach **About** (wnętrze, 3 pola) i **Gallery** (fryzury, 6 pól).
Gdy zamienisz wszystkie, możesz usunąć linijkę `<script src="image-slot.js"></script>` i sam plik `image-slot.js`.

---

## 🎨 Kolory motywu (w `css/style.css`, sekcja `:root`)

| Zmienna | Wartość | Zastosowanie |
|---|---|---|
| `--bg` | `#0a0806` | ciepła czerń (tło) |
| `--orange` / `--orange-bright` | `#ef8a3c` / `#ffa654` | akcent — światło |
| `--brick` | `#9b3f2d` | ceglasta czerwień |
| `--green` | `#7d9a5f` | botaniczna zieleń |
| `--ink` | `#f4ece2` | tekst (ciepła biel) |

Czcionki: **Bebas Neue** (nagłówki), **Manrope** (treść), **Mr Dafoe** (akcenty pisane) — ładowane z Google Fonts.

---

## 🚀 Publikacja

To statyczna strona — wgrasz ją wszędzie:

- **Hosting z domeną** → wgraj zawartość folderu przez FTP / menedżer plików (plik `index.html` w katalogu głównym).
- **Netlify Drop** (app.netlify.com/drop) → przeciągnij cały folder, link w kilka sekund.
- **Cloudflare Pages / GitHub Pages** → darmowo, można podpiąć własną domenę.

> Po publikacji upewnij się, że zdjęcia są już zwykłymi `<img>` (patrz wyżej).

---

## Dane kontaktowe salonu
- **Adres:** aleja Kompozytorów Polskich 3 / lok. 4, 20-848 Lublin
- **Telefon:** 733 451 488
- **Booksy:** https://booksy.com/pl-pl/dl/show-business/296326
- **Ocena:** 5,0 / 51 opinii (Google)
