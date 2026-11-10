#!/bin/bash
# Script temporário para gerar as imagens provisórias (SVG) do site.
OUT="img"

gen() {
  local file="$1" w="$2" h="$3" label="$4" desc="$5" tint="$6"
  cat > "$OUT/$file" << EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $w $h" role="img" aria-label="Imagem provisória - $desc">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="$tint"/>
      <stop offset="1" stop-color="#0A2240"/>
    </linearGradient>
    <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="#ffffff" opacity="0.10"/>
    </pattern>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F5A524" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#F5A524" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#F5A524" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="$w" height="$h" fill="url(#bg)"/>
  <rect width="$w" height="$h" fill="url(#dots)"/>
  <circle cx="$((w - w/6))" cy="$((h/7))" r="$((w/4))" fill="#2E7CF6" opacity="0.16"/>
  <circle cx="$((w/8))" cy="$((h - h/8))" r="$((w/6))" fill="#F5A524" opacity="0.12"/>
  <path d="M0 $((h - h/5)) L $w $((h - h/3)) L $w $h L 0 $h Z" fill="#061428" opacity="0.35"/>
  <g transform="translate($((w/2 - 78)), $((h/2 - 108))) scale(2.6)" fill="none" stroke="#F5A524" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <rect x="1" y="10" width="34" height="18" rx="2.5"/>
    <path d="M35 15h8.2l5.8 6.4V28H35z"/>
    <circle cx="11" cy="30.5" r="3.6"/>
    <circle cx="41" cy="30.5" r="3.6"/>
    <path d="M1 28h6.4M14.6 28h22.8"/>
    <path d="M38 18h4.5l2.6 3H38z"/>
    <path d="M4 15h12M4 20h9" opacity="0.5"/>
  </g>
  <rect x="$((w/2 - 150))" y="$((h/2 + 2))" width="300" height="3" fill="url(#band)"/>
  <text x="50%" y="$((h/2 + 52))" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="$((w/24))" font-weight="700" letter-spacing="4" fill="#FFFFFF" opacity="0.92">$label</text>
  <text x="50%" y="$((h/2 + 88))" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="$((w/42))" fill="#BFD3EA" opacity="0.9">$desc</text>
  <text x="50%" y="$((h/2 + 124))" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="$((w/52))" letter-spacing="2" fill="#F5A524" opacity="0.85">SUBSTITUIR PELA FOTO OFICIAL</text>
</svg>
EOF
  echo "gerado: $file"
}

gen hero.svg 1600 900 "FOTO DE DESTAQUE" "Imagem de capa da Home - Lucas Expresso" "#12406F"
gen sobre-01.svg 900 620 "FOTO 01 - INÍCIOS" "Primeiros passos da empresa" "#123A6B"
gen sobre-02.svg 900 620 "FOTO 02 - CRESCIMENTO" "Evolução da operação" "#0F4C81"
gen sobre-03.svg 900 620 "FOTO 03 - ATUALIDADE" "Estrutura atual da empresa" "#164C7E"
gen galeria-01.svg 900 700 "GALERIA 01" "Veículos da frota" "#123A6B"
gen galeria-02.svg 900 700 "GALERIA 02" "Equipe de trabalho" "#0F4C81"
gen galeria-03.svg 900 700 "GALERIA 03" "Estrutura da empresa" "#164C7E"
gen galeria-04.svg 900 700 "GALERIA 04" "Operação e entregas" "#12406F"
gen galeria-05.svg 900 700 "GALERIA 05" "Rotina de trabalho" "#123A6B"
gen galeria-06.svg 900 700 "GALERIA 06" "Momentos importantes" "#0F4C81"
gen galeria-07.svg 900 700 "GALERIA 07" "Atendimento ao cliente" "#164C7E"
gen galeria-08.svg 900 700 "GALERIA 08" "Detalhes da operação" "#12406F"
gen evolucao-01.svg 900 620 "MARCOS 01" "Fundação e primeiros passos" "#123A6B"
gen evolucao-02.svg 900 620 "MARCOS 02" "Primeiros clientes e conquistas" "#0F4C81"
gen evolucao-03.svg 900 620 "MARCOS 03" "Expansão dos atendimentos" "#164C7E"
gen evolucao-04.svg 900 620 "MARCOS 04" "Cenário atual e futuro" "#12406F"
