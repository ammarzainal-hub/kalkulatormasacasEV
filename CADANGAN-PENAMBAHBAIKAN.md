# Cadangan Penambahbaikan Kalkulator Mengecas EV

Fail ini menyimpan cadangan penambahbaikan untuk rujukan akan datang.

## Cadangan Utama

1. Jadikan kapasiti bateri boleh diubah

   Sekarang kapasiti `44.9 kWh` dikunci dalam `script.js` dan `index.html`. Jika aplikasi mahu digunakan untuk EV lain, tambah input kapasiti bateri.

2. Jadikan sasaran cas boleh diubah

   Sekarang sasaran cas `90%` dikunci dalam kod. Boleh tambah slider atau input untuk sasaran seperti `80%`, `90%`, atau `100%`.

3. Tambah had logik input

   Sekarang slider maksimum `89` kerana sasaran ialah `90%`. Jika sasaran menjadi dinamik, pastikan paras cas semasa tidak melebihi sasaran.

4. Tambah anggaran kos cas

   Tambah input harga elektrik per kWh, contohnya `RM 0.57/kWh`, kemudian papar anggaran kos:

   ```text
   Tenaga Diperlukan x Harga/kWh
   ```

5. Ambil kira kecekapan pengecasan

   Kiraan sekarang menggunakan nilai ideal sepenuhnya. Dalam penggunaan sebenar, ada kehilangan tenaga semasa pengecasan. Boleh tambah faktor kecekapan seperti `85%` hingga `95%`.

   Contoh:

   ```text
   energyNeeded / 0.9
   ```

6. Tambah pilihan pengecas tersuai

   Sekarang hanya ada `8A`, `16A`, dan `32A`. Boleh tambah input `kW tersuai`, contohnya untuk DC fast charger `30kW`, `60kW`, atau `120kW`.

7. Baiki aksesibiliti dan paparan dinamik

   Elemen `#result` dikemas kini melalui JavaScript. Boleh tambah `aria-live="polite"` supaya screen reader tahu keputusan telah berubah.

8. Elakkan penggunaan `innerHTML` untuk output kalkulasi

   Risiko semasa rendah kerana input terkawal, tetapi kod akan lebih bersih jika output dibina menggunakan DOM node atau sekurang-kurangnya dipisahkan kepada fungsi format/output.

9. Tambah Service Worker jika mahu PWA yang lebih lengkap

   `manifest.json` sudah wujud, tetapi belum ada `service-worker.js`. Jika mahu aplikasi boleh digunakan offline atau installable dengan lebih baik, tambah service worker untuk cache fail utama.

10. Perkemas responsif mobile

    Pada skrin kecil, `.result-item` mungkin menjadi sempit jika label panjang. Boleh susun kandungan secara column untuk paparan mobile.

## Isu Kecil Yang Diperhatikan

- `chargerCurrent` hanya digunakan untuk paparan. Kiraan sebenar bergantung pada nilai `data-kw`.
- `setInterval` setiap 60 saat sudah memadai untuk mengemas kini masa dalam mod automatik.
- Label `Fast Charger` untuk `6.3kW` mungkin agak mengelirukan kerana dalam konteks EV, fast charger biasanya merujuk kepada DC charger yang jauh lebih tinggi. Nama yang lebih sesuai mungkin `Wallbox 32A`.

## Cadangan Paling Praktikal Untuk Versi Seterusnya

Tambah ciri berikut dahulu kerana impaknya tinggi tetapi perubahan masih terkawal:

1. Input kapasiti bateri.
2. Slider sasaran cas.
3. Anggaran kos cas.
4. Faktor kecekapan pengecasan.
