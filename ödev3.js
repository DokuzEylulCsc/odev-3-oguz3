//Ibrahim Oğuzhan Ulukaya 2018280072  Node.js
// Kaynakça
// https://www.youtube.com/watch?v=s8M0KQ4B6eY
// https://stackoverflow.com/questions/2496710/writing-files-in-node-js
// https://www.yusufsezer.com.tr/javascript-dizi-siralama/

var fs = require('fs'); 

var data = fs.readFileSync('./input.txt', 'utf8');

var metin=data.split(" "); //soru sayısını buldum.
console.log("Soru sayısı:" + metin[0]);

var cvp = metin[1].split(","); //cevap anahtarını cıkardım.
console.log("Cevap Anahtarı:" + cvp);

if(metin.length>102){
    console.log("Tek seferde en fazla 100 öğrenci değerlendirilebilir.Lütfen listeyi kücültün.");
}
else {} // en fazla 100 öğrenci sınırı.


var puanlar = new Array();
var numaralar = new Array();
for(var i=2; i<metin.length; i++){ //tek tek öğrencileri bulup diziye atadım.
    var ogr = metin[i].split(",");
    var puan=0;
    var ogrnum = ogr[0]; //numaralarını aldım.
    for(var j=0; j<cvp.length; j++){ //soru sayısı kadar dönüp kontrol ediyor.
        if(ogr[j+1] == ''){
            var puan = puan;
        }
        else {
            if(ogr[j+1] == cvp[j]){
                var puan = puan + 4;
            }
            else if (ogr[j+1] != cvp[j]){
                var puan = puan - 1;
            }
        }
        
    }
    
    if(puan < 0){
        var puan=0;
    } // 0dan düşük olanları 0'a sabitledim.
    else {}
    var abc = 100/((cvp.length)*4); //100 üzerinden değerlendirmek için gereken katsayıyı buldum.
    var puan = puan*abc; //100 üzerinden değerlendirdim.
    var puan = parseInt(puan); //puan değerinin virgülden sonraki değerlerini sildim.
    puanlar[i-2]=puan;
    numaralar[i-2]=ogrnum;

}

var liste = new Array();
for(var x=0; x<numaralar.length; x++){ // numara ve puanı birlikte diziye atadım.
    liste.push({numara:numaralar[x] , not:puanlar[x]});
}
liste.sort(function(a, b){return b.not - a.not}); //notları sıraladım.

var metin1 = ""; // notları diziden alıp yazdırdım.
  for(var z = 0; z < liste.length; z++) {
    metin1 += liste[z].numara + " - " + liste[z].not +" \n";

}
console.log(metin1);

puanlar.sort(function(a, b){return a - b}); //en yüksek ve en düşük için notları sıraladım.
var enDusuk = puanlar[0];
var enYuksek = puanlar[puanlar.length-1];
var acıklık = (enYuksek - enDusuk);
console.log("En düşük not:" + enDusuk);
console.log("En yüksek not:" + enYuksek);

var toplam = 0;
for(var z=0; z<puanlar.length; z++){
    toplam += puanlar[z];
}
var ort = (toplam / (puanlar.length));
console.log("Ortalama:" + ort);
var medyan = 0;
if ((puanlar.length)/2==0){
    var ortna = (puanlar.length)/2;
    medyan = (puanlar[ortna]+puanlar[ortna+1])/2;
}
else {
    var ortna = (puanlar.length)/2;
    var ortna = Math.floor(ortna);
    medyan = puanlar[ortna];
}
console.log("Medyan:" + medyan);
console.log("Açıklık(range):" + acıklık);

var fs1 = require('fs'); //dosyaya yazdırıyorum.
var stream = fs1.createWriteStream("output.txt");
stream.once('open', function(fd) {
  stream.write("Soru sayısı:" + metin[0] + "\n");
  stream.write("Cevap Anahtarı:" + cvp + "\n");
  stream.write(metin1 + "\n");
  stream.write("En düşük not:" + enDusuk + "\n");
  stream.write("En yüksek not:" + enYuksek + "\n");
  stream.write("Ortalama:" + ort + "\n");
  stream.write("Medyan:" + medyan + "\n");
  stream.write("Açıklık(range):" + acıklık + "\n");
  stream.end();
});

