import * as wasm from "lz4-wasm";
// import * as JSZip from "jszip";
var lz4js = require('lz4/lib/binding')
 import * as fflate from 'fflate/esm/browser.js';

// benchmark data
let test_input = `
{"commonness":0,"ent_seq":"1383360","kana":[{"commonness":0,"ent_seq":"1383360","romaji":"Sekigai","text":"せきがい"}],"kanji":[{"commonness":0,"ent_seq":"1383360","readings":["せきがい"],"text":"赤外"}],"meanings":{"eng":["infrared"],"ger":[{"rank":1,"text":"Infrarot (n)"},{"rank":2,"text":"Infrarot…"}]},"misc":[],"pos":["adj-na","adj-no"]}
{"commonness":40,"ent_seq":"1383370","kana":[{"commonness":20,"ent_seq":"1383370","romaji":"Sekigaisen","text":"せきがいせん"}],"kanji":[{"commonness":20,"ent_seq":"1383370","readings":["せきがいせん"],"text":"赤外線"}],"meanings":{"eng":["infrared rays"],"ger":[{"text":"Infrarot (n)"},{"text":"Wärmestrahlung (f)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383380","kana":[{"commonness":0,"ent_seq":"1383380","romaji":"Sekigaihassan","text":"せきがいはっさん"}],"kanji":[{"commonness":0,"ent_seq":"1383380","readings":["せきがいはっさん"],"text":"赤外発散"}],"meanings":{"eng":["infrared divergence"],"ger":[{"text":"Infrarotdivergenz (f)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383390","kana":[{"commonness":0,"ent_seq":"1383390","romaji":"Sekkasshoku","text":"せっかっしょく"}],"kanji":[{"commonness":0,"ent_seq":"1383390","readings":["せっかっしょく"],"text":"赤褐色"}],"meanings":{"eng":["reddish brown","rufous"],"ger":[{"text":"Rotbraun (n)"},{"text":"rotbraun"}]},"misc":[],"pos":["n","adj-no"]}
{"commonness":40,"ent_seq":"1383400","kana":[{"commonness":20,"ent_seq":"1383400","romaji":"Sekigun","text":"せきぐん"}],"kanji":[{"commonness":20,"ent_seq":"1383400","readings":["せきぐん"],"text":"赤軍"}],"meanings":{"eng":["Red Army"],"ger":[{"text":"die Rote Armee (f)"}]},"misc":[],"pos":["n"]}
{"commonness":10,"ent_seq":"1383410","kana":[{"commonness":5,"ent_seq":"1383410","romaji":"Sekkekkyuu","text":"せっけっきゅう"}],"kanji":[{"commonness":5,"ent_seq":"1383410","readings":["せっけっきゅう"],"text":"赤血球"}],"meanings":{"eng":["red blood cell","erythrocyte"],"ger":[{"text":"rotes Blutkörperchen (n)"},{"text":"Erythrozyt (m)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383420","kana":[{"commonness":0,"ent_seq":"1383420","romaji":"Akafuda","text":"あかふだ"}],"kanji":[{"commonness":0,"ent_seq":"1383420","readings":["あかふだ"],"text":"赤札"}],"meanings":{"eng":["goods sold","clearance sale"],"ger":[{"text":"roter Zettel (insbes. als Markierung für Waren im Sonderangebot od. bereits verkaufte Waren) (m)"}]},"misc":[],"pos":["n","adj-no"]}
{"commonness":0,"ent_seq":"1383430","kana":[{"commonness":0,"ent_seq":"1383430","romaji":"Akamurasaki","text":"あかむらさき"}],"kanji":[{"commonness":0,"ent_seq":"1383430","readings":["あかむらさき"],"text":"赤紫"}],"meanings":{"eng":["purplish red"],"ger":[{"text":"rötliches Violett (n)"}]},"misc":[],"pos":["n"]}
{"commonness":115,"ent_seq":"1383440","kana":[{"commonness":40,"ent_seq":"1383440","romaji":"Akaji","text":"あかじ"}],"kanji":[{"commonness":75,"ent_seq":"1383440","readings":["あかじ"],"text":"赤字"}],"meanings":{"eng":["deficit","(being in or going into) the red","red text","red letters","corrections (by a teacher or proofreader) written in red"],"ger":[{"rank":1,"text":"rote Zahlen (f)"},{"text":"Defizit (n)"},{"text":"Fehlbetrag (m)"},{"text":"Verlust (m)"},{"text":"Passivsaldo (m)"},{"rank":2,"text":"Korrekturlesen (n)"},{"text":"defizitär"}]},"misc":[],"pos":["n","adj-no"]}
{"commonness":0,"ent_seq":"1383450","kana":[{"commonness":0,"ent_seq":"1383450","romaji":"Akajikokusai","text":"あかじこくさい"}],"kanji":[{"commonness":0,"ent_seq":"1383450","readings":["あかじこくさい"],"text":"赤字国債"}],"meanings":{"eng":["deficit-covering (government) bond"],"ger":[{"text":"Defizitfinanzierungsanleihe (f)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383460","kana":[{"commonness":0,"ent_seq":"1383460","romaji":"Akagari","text":"あかがり"}],"kanji":[{"commonness":0,"ent_seq":"1383460","readings":["あかがり"],"text":"赤狩り"}],"meanings":{"eng":["communist hunting","red-baiting"],"ger":[{"text":"Kommunistenjagd (f)"},{"rank":1,"text":"Verbannung von Kommunisten aus öffentlichen Ämtern und Unternehmen (in Japan 1949–1950)"}]},"misc":[],"pos":["n"]}
{"commonness":8,"ent_seq":"1383470","kana":[{"commonness":0,"ent_seq":"1383470","romaji":"Sekijuuji","text":"せきじゅうじ"}],"kanji":[{"commonness":8,"ent_seq":"1383470","readings":["せきじゅうじ"],"text":"赤十字"}],"meanings":{"eng":["Red Cross"],"ger":[{"text":"Rotes Kreuz (internationales Schutzzeichen) (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383480","kana":[{"commonness":0,"ent_seq":"1383480","romaji":"Sekijuujikokusaiiinkai","text":"せきじゅうじこくさいいいんかい"}],"kanji":[{"commonness":0,"ent_seq":"1383480","readings":["せきじゅうじこくさいいいんかい"],"text":"赤十字国際委員会"}],"meanings":{"eng":["International Committee of the Red Cross"],"ger":[{"text":"Internationales Komitee des Roten Kreuzes (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383490","kana":[{"commonness":0,"ent_seq":"1383490","romaji":"Sekijuujisha","text":"せきじゅうじしゃ"}],"kanji":[{"commonness":0,"ent_seq":"1383490","readings":["せきじゅうじしゃ"],"text":"赤十字社"}],"meanings":{"eng":["the Red Cross"],"ger":[{"text":"das Rote Kreuz (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383500","kana":[{"commonness":0,"ent_seq":"1383500","romaji":"Akasen","text":"あかせん"}],"kanji":[{"commonness":0,"ent_seq":"1383500","readings":["あかせん"],"text":"赤線"}],"meanings":{"eng":["red line","red-light district"],"ger":[{"rank":1,"text":"rote Linie (f)"},{"rank":2,"text":"Rotlichtviertel (weil dieses auf Karten z.B. der Polizei mit einer roten Linie markiert war) (n)"}]},"misc":[],"pos":["n"]}
{"commonness":1,"ent_seq":"1383510","kana":[{"commonness":0,"ent_seq":"1383510","romaji":"Akahaji","text":"あかはじ"},{"commonness":0,"ent_seq":"1383510","romaji":"Akappaji","text":"あかっぱじ"}],"kanji":[{"commonness":1,"ent_seq":"1383510","readings":["あかはじ"],"text":"赤恥"},{"commonness":0,"ent_seq":"1383510","readings":["あかっぱじ"],"text":"赤っ恥"}],"meanings":{"eng":["shame","disgrace"],"ger":[{"text":"ungeheure Schande (f)"},{"text":"ungeheure Schmach (f)"}]},"misc":[],"pos":["n"]}
{"commonness":10,"ent_seq":"1383520","kana":[{"commonness":5,"ent_seq":"1383520","romaji":"Akashio","text":"あかしお"}],"kanji":[{"commonness":5,"ent_seq":"1383520","readings":["あかしお"],"text":"赤潮"}],"meanings":{"eng":["red tide"],"ger":[{"text":"rote Meeresströmung (Meersströmung mit durch Blutalgen verursachter roter Färbung) (f)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383530","kana":[{"commonness":0,"ent_seq":"1383530","romaji":"Akakokko","text":"あかこっこ"},{"commonness":0,"ent_seq":"1383530","romaji":"Akakokko","text":"アカコッコ"}],"kanji":[{"commonness":0,"ent_seq":"1383530","readings":["あかこっこ"],"text":"赤こっこ"}],"meanings":{"eng":["Izu thrush (Turdus celaenops)"]},"misc":[],"pos":["n"]}
{"commonness":80,"ent_seq":"1383560","kana":[{"commonness":35,"ent_seq":"1383560","romaji":"Sekidou","text":"せきどう"}],"kanji":[{"commonness":45,"ent_seq":"1383560","readings":["せきどう"],"text":"赤道"}],"meanings":{"eng":["equator"],"ger":[{"text":"Äquator (m)"},{"text":"äquatorial"}]},"misc":[],"pos":["n","adj-no"]}
{"commonness":0,"ent_seq":"1383570","kana":[{"commonness":0,"ent_seq":"1383570","romaji":"Sekinetsu","text":"せきねつ"},{"commonness":0,"ent_seq":"1383570","romaji":"Shakunetsu","text":"しゃくねつ"}],"kanji":[{"commonness":0,"ent_seq":"1383570","readings":["せきねつ","しゃくねつ"],"text":"赤熱"}],"meanings":{"eng":["red hot"],"ger":[{"text":"Rotglut (f)"},{"text":"zur Rotglut bringen"},{"text":"rot glühend"}]},"misc":[],"pos":["n","vs","adj-no"]}
{"commonness":40,"ent_seq":"1383580","kana":[{"commonness":20,"ent_seq":"1383580","romaji":"Sekihan","text":"せきはん"}],"kanji":[{"commonness":20,"ent_seq":"1383580","readings":["せきはん"],"text":"赤飯"}],"meanings":{"eng":["red rice (beans and mochi) for auspicious occasions"],"ger":[{"text":"Sekihan (mit roten Bohnen gekochter Reis; ein Festessen) (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383590","kana":[{"commonness":0,"ent_seq":"1383590","romaji":"Sekihin","text":"せきひん"}],"kanji":[{"commonness":0,"ent_seq":"1383590","readings":["せきひん"],"text":"赤貧"}],"meanings":{"eng":["extreme poverty"],"ger":[{"text":"bittere Armut (f)"},{"text":"drückende Not (f)"}]},"misc":[],"pos":["n","adj-no"]}
{"commonness":0,"ent_seq":"1383600","kana":[{"commonness":0,"ent_seq":"1383600","romaji":"Akakabu","text":"あかかぶ"},{"commonness":0,"ent_seq":"1383600","romaji":"Akakabu","text":"あかカブ"}],"kanji":[{"commonness":0,"ent_seq":"1383600","readings":["あかかぶ"],"text":"赤かぶ"},{"commonness":0,"ent_seq":"1383600","readings":["あかカブ"],"text":"赤カブ"},{"commonness":0,"ent_seq":"1383600","readings":["あかかぶ"],"text":"赤蕪"}],"meanings":{"eng":["red turnip","small red radish"],"ger":[{"text":"Radieschen (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383610","kana":[{"commonness":0,"ent_seq":"1383610","romaji":"Akabou","text":"あかぼう"}],"kanji":[{"commonness":0,"ent_seq":"1383610","readings":["あかぼう"],"text":"赤帽"}],"meanings":{"eng":["redcap","porter"],"ger":[{"rank":1,"text":"Gepäckträger (mit roter Kappe) (m)"},{"rank":2,"text":"rote Kappe (f)"},{"text":"roter Hut (m)"}]},"misc":[],"pos":["n"]}
{"commonness":37,"ent_seq":"1383620","kana":[{"commonness":15,"ent_seq":"1383620","romaji":"Sekimen","text":"せきめん"}],"kanji":[{"commonness":22,"ent_seq":"1383620","readings":["せきめん"],"text":"赤面"}],"meanings":{"eng":["blushing","getting red in the face","embarrassment"],"ger":[{"text":"Erröten (n)"},{"text":"Rotwerden (n)"},{"text":"erröten"},{"text":"rot werden"},{"text":"einen roten Kopf bekommen"},{"text":"sich schämen"}]},"misc":[],"pos":["n","vs"]}
{"commonness":10,"ent_seq":"1383630","kana":[{"commonness":5,"ent_seq":"1383630","romaji":"Akage","text":"あかげ"}],"kanji":[{"commonness":5,"ent_seq":"1383630","readings":["あかげ"],"text":"赤毛"}],"meanings":{"eng":["redhead"],"ger":[{"text":"rotes Haar (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383640","kana":[{"commonness":0,"ent_seq":"1383640","romaji":"Akahadaka","text":"あかはだか"},{"commonness":0,"ent_seq":"1383640","romaji":"Sekira","text":"せきら"}],"kanji":[{"commonness":0,"ent_seq":"1383640","readings":["あかはだか","せきら"],"text":"赤裸"}],"meanings":{"eng":["stark naked","nakedness","nudity","stripped of all belongings","without a penny","naked barley (Hordeum vulgare var. nudum)"],"ger":[{"rank":1,"text":"vollkommene Nacktheit (f)"},{"rank":2,"text":"drückende Armut (f)"},{"rank":1,"text":"splitternackt"},{"rank":2,"text":"gerupft"},{"text":"geschoren"}]},"misc":[],"pos":["adj-na","n","adj-no","n"]}
{"commonness":20,"ent_seq":"1383660","kana":[{"commonness":10,"ent_seq":"1383660","romaji":"Sekiri","text":"せきり"}],"kanji":[{"commonness":10,"ent_seq":"1383660","readings":["せきり"],"text":"赤痢"}],"meanings":{"eng":["dysentery"],"ger":[{"text":"rote Ruhr (f)"},{"text":"Dysenterie (f)"}]},"misc":[],"pos":["n","adj-no"]}
{"commonness":0,"ent_seq":"1383670","kana":[{"commonness":0,"ent_seq":"1383670","romaji":"Akashoubin","text":"あかしょうびん"},{"commonness":0,"ent_seq":"1383670","romaji":"Akashoubin","text":"アカショウビン"}],"kanji":[{"commonness":0,"ent_seq":"1383670","readings":["あかしょうびん"],"text":"赤翡翠"}],"meanings":{"eng":["ruddy kingfisher (Halcyon coromanda)"],"ger":[{"text":"großer, rötlich brauner asiatischer Eisvogel (m)"},{"text":"Halcyon coromanda"}]},"misc":["word usually written using kana alone"],"pos":["n"],"useKana":true}
{"commonness":97,"ent_seq":"1383680","kana":[{"commonness":40,"ent_seq":"1383680","romaji":"Ato","text":"あと"}],"kanji":[{"commonness":57,"ent_seq":"1383680","readings":["あと"],"text":"跡"},{"commonness":0,"ent_seq":"1383680","readings":["あと"],"text":"迹"},{"commonness":0,"ent_seq":"1383680","readings":["あと"],"text":"痕"},{"commonness":0,"ent_seq":"1383680","readings":["あと"],"text":"址"}],"meanings":{"eng":["trace","tracks","mark","sign","remains","ruins","scar"],"ger":[{"rank":1,"text":"Fußabdruck (m)"},{"text":"Fußstapfen (m)"},{"text":"Fußspur (f)"},{"text":"Fährte (f)"},{"rank":2,"text":"Spur (f)"},{"text":"Gleis (n)"},{"rank":3,"text":"Reste (m)"},{"text":"Überbleibsel (n)"},{"text":"Ruine (f)"},{"rank":4,"text":"Vorbild (n)"},{"text":"Muster (n)"},{"text":"Präzedenzfall (m)"},{"rank":5,"text":"Hinterlassenschaft (f)"},{"text":"Vermächtnis (n)"},{"text":"Erbe (n)"},{"rank":6,"text":"Hinterbliebener (m)"},{"text":""},{"text":"Ort, an dem sich die Füße befinden (m)"},{"text":"zu Füßen"},{"rank":1,"text":"Schrift (f)"},{"text":"Handschrift (f)"},{"text":"Schriftzeichen (n)"}]},"misc":[],"pos":["n"]}
{"commonness":20,"ent_seq":"1383690","kana":[{"commonness":10,"ent_seq":"1383690","romaji":"Atotsugi","text":"あとつぎ"}],"kanji":[{"commonness":10,"ent_seq":"1383690","readings":["あとつぎ"],"text":"跡継ぎ"},{"commonness":0,"ent_seq":"1383690","readings":["あとつぎ"],"text":"後継ぎ"},{"commonness":0,"ent_seq":"1383690","readings":["あとつぎ"],"text":"跡継"},{"commonness":0,"ent_seq":"1383690","readings":["あとつぎ"],"text":"後継"}],"meanings":{"eng":["heir","successor"],"ger":[{"rank":1,"text":"Nachfolger (m)"},{"rank":2,"text":"Erbe (m)"},{"text":"Stammhalter (m)"}]},"misc":[],"pos":["n"]}
{"commonness":10,"ent_seq":"1383700","kana":[{"commonness":5,"ent_seq":"1383700","romaji":"Atotori","text":"あととり"}],"kanji":[{"commonness":5,"ent_seq":"1383700","readings":["あととり"],"text":"跡取り"}],"meanings":{"eng":["heir","heiress","inheritor","successor"],"ger":[{"rank":1,"text":"Nachfolger (m)"},{"rank":2,"text":"Erbe (m)"},{"text":"Stammhalter (m)"}]},"misc":[],"pos":["n"]}
{"commonness":10,"ent_seq":"1383710","kana":[{"commonness":5,"ent_seq":"1383710","romaji":"Atome","text":"あとめ"}],"kanji":[{"commonness":5,"ent_seq":"1383710","readings":["あとめ"],"text":"跡目"}],"meanings":{"eng":["headship of a family","family property"],"ger":[{"text":"Erbschaft (f)"},{"text":"Erbe (m)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383720","kana":[{"commonness":0,"ent_seq":"1383720","romaji":"Sekigaku","text":"せきがく"}],"kanji":[{"commonness":0,"ent_seq":"1383720","readings":["せきがく"],"text":"碩学"}],"meanings":{"eng":["great scholar","profound scholar"],"ger":[{"rank":1,"text":"große Gelehrsamkeit (f)"},{"rank":2,"text":"großer Gelehrter (m)"},{"text":"Persönlichkeit von tiefer (f) Gelehrsamkeit"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383730","kana":[{"commonness":0,"ent_seq":"1383730","romaji":"Sekiju","text":"せきじゅ"}],"kanji":[{"commonness":0,"ent_seq":"1383730","readings":["せきじゅ"],"text":"碩儒"}],"meanings":{"eng":["(Confucian) scholar"],"ger":[{"rank":1,"text":"große Gelehrsamkeit (f)"},{"rank":2,"text":"großer Gelehrter (m)"},{"text":"Persönlichkeit von tiefer Gelehrsamkeit (f)"}]},"misc":[],"pos":["n"]}
{"commonness":20,"ent_seq":"1383750","kana":[{"commonness":10,"ent_seq":"1383750","romaji":"Setsu","text":"せつ"}],"kanji":[{"commonness":10,"ent_seq":"1383750","readings":["せつ"],"text":"切"}],"meanings":{"eng":["eager","earnest","ardent","kind","keen","acute"],"ger":[{"rank":1,"text":"aufrichtig"},{"text":"brennend"},{"text":"glühend"},{"rank":2,"text":"begeistert"},{"text":"leidenschaftlich"}]},"misc":[],"pos":["adj-na","n"]}
{"commonness":2,"ent_seq":"1383760","kana":[{"commonness":0,"ent_seq":"1383760","romaji":"Kitteno","text":"きっての"}],"kanji":[{"commonness":2,"ent_seq":"1383760","readings":["きっての"],"text":"切っての"}],"meanings":{"eng":["the most . . . of all"]},"misc":["word usually written using kana alone"],"pos":["suf","adj-pn"],"useKana":true}
{"commonness":30,"ent_seq":"1383770","kana":[{"commonness":15,"ent_seq":"1383770","romaji":"Setsunai","text":"せつない"}],"kanji":[{"commonness":15,"ent_seq":"1383770","readings":["せつない"],"text":"切ない"}],"meanings":{"eng":["painful","heartrending","trying","oppressive","suffocating","miserable"],"ger":[{"text":"schmerzhaft"},{"text":"schmerzlich"},{"text":"qualvoll"},{"text":"unerträglich"}]},"misc":[],"pos":["adj-i"]}
{"commonness":56,"ent_seq":"1383780","kana":[{"commonness":20,"conjugated":[{"form":"きらさないでください","name":"negative request"},{"form":"きらしませんでした","name":"past polite negative"},{"form":"きらさなかった","name":"past negative"},{"form":"きらさせられる","name":"causative passive"},{"form":"きらすでしょう","name":"polite presumptive"},{"form":"きらしたげる","name":"simplified te ageru"},{"form":"きらしている","name":"te iru"},{"form":"きらしてある","name":"te aru"},{"form":"きらしません","name":"present polite negative"},{"form":"きらしておる","name":"te oru"},{"form":"きらしておく","name":"te oku"},{"form":"きらしたがる","name":"other's desire"},{"form":"きらしました","name":"past polite"},{"form":"きらすらしい","name":"apparently the case"},{"form":"きらすだろう","name":"plain presumptive"},{"form":"きらしたろう","name":"past presumptive"},{"form":"きらしとる","name":"simplified te oru"},{"form":"きらすそう","name":"claimed to be the case"},{"form":"きらさない","name":"present negative"},{"form":"きらしたい","name":"desire"},{"form":"きらします","name":"present polite"},{"form":"きらしてる","name":"simplified te iru"},{"form":"きらしたり","name":"representative"},{"form":"きらしそう","name":"looks to be the case"},{"form":"きらしかた","name":"way of doing"},{"form":"きらさせる","name":"causative"},{"form":"きらされる","name":"passive"},{"form":"きらしとく","name":"simplified te oku"},{"form":"きらせる","name":"short potential"},{"form":"きらせば","name":"hypothetical"},{"form":"きらそう","name":"pseudo futurum"},{"form":"きらして","name":"te form"},{"form":"きらすな","name":"negative imperative"},{"form":"きらし-","name":"conjunctive"},{"form":"きらした","name":"past"},{"form":"きらせ","name":"commanding"}],"ent_seq":"1383780","romaji":"Kirasu","text":"きらす"}],"kanji":[{"commonness":36,"conjugated":[{"form":"切らさないでください","name":"negative request"},{"form":"切らしませんでした","name":"past polite negative"},{"form":"切らさなかった","name":"past negative"},{"form":"切らさせられる","name":"causative passive"},{"form":"切らすでしょう","name":"polite presumptive"},{"form":"切らしたげる","name":"simplified te ageru"},{"form":"切らしている","name":"te iru"},{"form":"切らしてある","name":"te aru"},{"form":"切らしません","name":"present polite negative"},{"form":"切らしておる","name":"te oru"},{"form":"切らしておく","name":"te oku"},{"form":"切らしたがる","name":"other's desire"},{"form":"切らしました","name":"past polite"},{"form":"切らすらしい","name":"apparently the case"},{"form":"切らすだろう","name":"plain presumptive"},{"form":"切らしたろう","name":"past presumptive"},{"form":"切らしとる","name":"simplified te oru"},{"form":"切らすそう","name":"claimed to be the case"},{"form":"切らさない","name":"present negative"},{"form":"切らしたい","name":"desire"},{"form":"切らします","name":"present polite"},{"form":"切らしてる","name":"simplified te iru"},{"form":"切らしたり","name":"representative"},{"form":"切らしそう","name":"looks to be the case"},{"form":"切らしかた","name":"way of doing"},{"form":"切らさせる","name":"causative"},{"form":"切らされる","name":"passive"},{"form":"切らしとく","name":"simplified te oku"},{"form":"切らせる","name":"short potential"},{"form":"切らせば","name":"hypothetical"},{"form":"切らそう","name":"pseudo futurum"},{"form":"切らして","name":"te form"},{"form":"切らすな","name":"negative imperative"},{"form":"切らし-","name":"conjunctive"},{"form":"切らした","name":"past"},{"form":"切らせ","name":"commanding"}],"ent_seq":"1383780","readings":["きらす"],"text":"切らす"}],"meanings":{"eng":["be out of","run out of","be short of","be out of stock"],"ger":[{"text":"ausgegangen sein"},{"text":"nicht auf Lager sein"},{"text":"nicht vorrätig sein"},{"text":"alle werden"},{"text":"ausverkauft haben"}]},"misc":[],"pos":["v5s","vt"]}
{"commonness":0,"ent_seq":"1383790","kana":[{"commonness":0,"ent_seq":"1383790","romaji":"Kiranai","text":"きらない"}],"kanji":[{"commonness":0,"ent_seq":"1383790","readings":["きらない"],"text":"切ら無い"},{"commonness":0,"ent_seq":"1383790","readings":["きらない"],"text":"切らない"}],"meanings":{"eng":["not through","not finished","not done"]},"misc":[],"pos":["adj-i"]}
{"commonness":241,"ent_seq":"1383800","kana":[{"commonness":35,"ent_seq":"1383800","romaji":"Kiri","text":"きり"}],"kanji":[{"commonness":45,"ent_seq":"1383800","readings":["きり"],"text":"切り"},{"commonness":161,"ent_seq":"1383800","readings":["きり"],"text":"限り"},{"commonness":0,"ent_seq":"1383800","readings":["きり"],"text":"限"}],"meanings":{"eng":["end","finish","stop","bounds","limits","delivery date (of a futures contract)","finale (of a noh song)","end of an act (in joruri or kabuki)","final performance of the day (in vaudeville)","counter for slices (esp. thick slices)","counter for cuts (e.g. fish, meat)","only","just","since","after","remaining (in a particular state)"],"ger":[{"text":"Schluss (m)"},{"text":"Ende (n)"}]},"misc":[],"pos":["n","suf","ctr","prt"]}
{"commonness":38,"ent_seq":"1383810","kana":[{"commonness":15,"ent_seq":"1383810","romaji":"Kiriganai","text":"きりがない"}],"kanji":[{"commonness":15,"ent_seq":"1383810","readings":["きりがない"],"text":"切りがない"},{"commonness":8,"ent_seq":"1383810","readings":["きりがない"],"text":"切りが無い"}],"meanings":{"eng":["endless (innumerable)"],"ger":[{"text":"endlos sein"},{"text":"ohne Ende sein"},{"text":"uferlos sein"}]},"misc":["word usually written using kana alone"],"pos":["exp"],"useKana":true}
{"commonness":0,"ent_seq":"1383820","kana":[{"commonness":0,"ent_seq":"1383820","romaji":"Kirigaii","text":"きりがいい"},{"commonness":0,"ent_seq":"1383820","romaji":"Kirigaii","text":"キリがいい"}],"kanji":[{"commonness":0,"ent_seq":"1383820","readings":["きりがいい"],"text":"切りがいい"}],"meanings":{"eng":["good place (to leave off)"]},"misc":["word usually written using kana alone"],"pos":["exp","adj-ix"],"useKana":true}
{"commonness":0,"ent_seq":"1383830","kana":[{"commonness":0,"ent_seq":"1383830","romaji":"Kirippashi","text":"きりっぱし"}],"kanji":[{"commonness":0,"ent_seq":"1383830","readings":["きりっぱし"],"text":"切りっ端"}],"meanings":{"eng":["scraps","cut end","cut-off piece"]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383840","kana":[{"commonness":0,"ent_seq":"1383840","romaji":"Kirinonai","text":"きりのない"}],"kanji":[{"commonness":0,"ent_seq":"1383840","readings":["きりのない"],"text":"切りのない"},{"commonness":0,"ent_seq":"1383840","readings":["きりのない"],"text":"切りの無い"}],"meanings":{"eng":["endless","boundless"],"ger":[{"text":"endlos"},{"text":"grenzenlos"}]},"misc":["word usually written using kana alone"],"pos":["exp","adj-i"],"useKana":true}
{"commonness":12,"ent_seq":"1383850","kana":[{"commonness":5,"conjugated":[{"form":"きりさげないでください","name":"negative request"},{"form":"きりさげませんでした","name":"past polite negative"},{"form":"きりさげなかった","name":"past negative"},{"form":"きりさげさせられる","name":"causative passive"},{"form":"きりさげるでしょう","name":"polite presumptive"},{"form":"きりさげたげる","name":"simplified te ageru"},{"form":"きりさげている","name":"te iru"},{"form":"きりさげてある","name":"te aru"},{"form":"きりさげません","name":"present polite negative"},{"form":"きりさげておる","name":"te oru"},{"form":"きりさげておく","name":"te oku"},{"form":"きりさげたがる","name":"other's desire"},{"form":"きりさげました","name":"past polite"},{"form":"きりさげるらしい","name":"apparently the case"},{"form":"きりさげるだろう","name":"plain presumptive"},{"form":"きりさげたろう","name":"past presumptive"},{"form":"きりさげとる","name":"simplified te oru"},{"form":"きりさげるそう","name":"claimed to be the case"},{"form":"きりさげない","name":"present negative"},{"form":"きりさげたい","name":"desire"},{"form":"きりさげます","name":"present polite"},{"form":"きりさげてる","name":"simplified te iru"},{"form":"きりさげたり","name":"representative"},{"form":"きりさげそう","name":"looks to be the case"},{"form":"きりさげかた","name":"way of doing"},{"form":"きりさげさせる","name":"causative"},{"form":"きりさげられる","name":"passive"},{"form":"きりさげとく","name":"simplified te oku"},{"form":"きりさげ","name":"short potential"},{"form":"きりさげれば","name":"hypothetical"},{"form":"きりさげよう","name":"pseudo futurum"},{"form":"きりさげて","name":"te form"},{"form":"きりさげるな","name":"negative imperative"},{"form":"きりさげ-","name":"conjunctive"},{"form":"きりさげた","name":"past"},{"form":"きりさげろ","name":"commanding"}],"ent_seq":"1383850","romaji":"Kirisageru","text":"きりさげる"}],"kanji":[{"commonness":7,"conjugated":[{"form":"切り下げないでください","name":"negative request"},{"form":"切り下げませんでした","name":"past polite negative"},{"form":"切り下げなかった","name":"past negative"},{"form":"切り下げさせられる","name":"causative passive"},{"form":"切り下げるでしょう","name":"polite presumptive"},{"form":"切り下げたげる","name":"simplified te ageru"},{"form":"切り下げている","name":"te iru"},{"form":"切り下げてある","name":"te aru"},{"form":"切り下げません","name":"present polite negative"},{"form":"切り下げておる","name":"te oru"},{"form":"切り下げておく","name":"te oku"},{"form":"切り下げたがる","name":"other's desire"},{"form":"切り下げました","name":"past polite"},{"form":"切り下げるらしい","name":"apparently the case"},{"form":"切り下げるだろう","name":"plain presumptive"},{"form":"切り下げたろう","name":"past presumptive"},{"form":"切り下げとる","name":"simplified te oru"},{"form":"切り下げるそう","name":"claimed to be the case"},{"form":"切り下げない","name":"present negative"},{"form":"切り下げたい","name":"desire"},{"form":"切り下げます","name":"present polite"},{"form":"切り下げてる","name":"simplified te iru"},{"form":"切り下げたり","name":"representative"},{"form":"切り下げそう","name":"looks to be the case"},{"form":"切り下げかた","name":"way of doing"},{"form":"切り下げさせる","name":"causative"},{"form":"切り下げられる","name":"passive"},{"form":"切り下げとく","name":"simplified te oku"},{"form":"切り下げ","name":"short potential"},{"form":"切り下げれば","name":"hypothetical"},{"form":"切り下げよう","name":"pseudo futurum"},{"form":"切り下げて","name":"te form"},{"form":"切り下げるな","name":"negative imperative"},{"form":"切り下げ-","name":"conjunctive"},{"form":"切り下げた","name":"past"},{"form":"切り下げろ","name":"commanding"}],"ent_seq":"1383850","readings":["きりさげる"],"text":"切り下げる"}],"meanings":{"eng":["cut down","prune","reduce","cut and hang down","cut shorter","round down (e.g. fraction)"],"ger":[{"rank":1,"text":"abwerten (ein Währung)"},{"rank":2,"text":"erniedrigen"},{"text":"reduzieren"},{"text":"kürzen"}]},"misc":[],"pos":["v1","vt"]}
{"commonness":0,"ent_seq":"1383860","kana":[{"commonness":0,"conjugated":[{"form":"きりおろさないでください","name":"negative request"},{"form":"きりおろしませんでした","name":"past polite negative"},{"form":"きりおろさなかった","name":"past negative"},{"form":"きりおろさせられる","name":"causative passive"},{"form":"きりおろすでしょう","name":"polite presumptive"},{"form":"きりおろしたげる","name":"simplified te ageru"},{"form":"きりおろしている","name":"te iru"},{"form":"きりおろしてある","name":"te aru"},{"form":"きりおろしません","name":"present polite negative"},{"form":"きりおろしておる","name":"te oru"},{"form":"きりおろしておく","name":"te oku"},{"form":"きりおろしたがる","name":"other's desire"},{"form":"きりおろしました","name":"past polite"},{"form":"きりおろすらしい","name":"apparently the case"},{"form":"きりおろすだろう","name":"plain presumptive"},{"form":"きりおろしたろう","name":"past presumptive"},{"form":"きりおろしとる","name":"simplified te oru"},{"form":"きりおろすそう","name":"claimed to be the case"},{"form":"きりおろさない","name":"present negative"},{"form":"きりおろしたい","name":"desire"},{"form":"きりおろします","name":"present polite"},{"form":"きりおろしてる","name":"simplified te iru"},{"form":"きりおろしたり","name":"representative"},{"form":"きりおろしそう","name":"looks to be the case"},{"form":"きりおろしかた","name":"way of doing"},{"form":"きりおろさせる","name":"causative"},{"form":"きりおろされる","name":"passive"},{"form":"きりおろしとく","name":"simplified te oku"},{"form":"きりおろせる","name":"short potential"},{"form":"きりおろせば","name":"hypothetical"},{"form":"きりおろそう","name":"pseudo futurum"},{"form":"きりおろして","name":"te form"},{"form":"きりおろすな","name":"negative imperative"},{"form":"きりおろし-","name":"conjunctive"},{"form":"きりおろした","name":"past"},{"form":"きりおろせ","name":"commanding"}],"ent_seq":"1383860","romaji":"Kiriorosu","text":"きりおろす"}],"kanji":[{"commonness":0,"conjugated":[{"form":"切り下ろさないでください","name":"negative request"},{"form":"切り下ろしませんでした","name":"past polite negative"},{"form":"切り下ろさなかった","name":"past negative"},{"form":"切り下ろさせられる","name":"causative passive"},{"form":"切り下ろすでしょう","name":"polite presumptive"},{"form":"切り下ろしたげる","name":"simplified te ageru"},{"form":"切り下ろしている","name":"te iru"},{"form":"切り下ろしてある","name":"te aru"},{"form":"切り下ろしません","name":"present polite negative"},{"form":"切り下ろしておる","name":"te oru"},{"form":"切り下ろしておく","name":"te oku"},{"form":"切り下ろしたがる","name":"other's desire"},{"form":"切り下ろしました","name":"past polite"},{"form":"切り下ろすらしい","name":"apparently the case"},{"form":"切り下ろすだろう","name":"plain presumptive"},{"form":"切り下ろしたろう","name":"past presumptive"},{"form":"切り下ろしとる","name":"simplified te oru"},{"form":"切り下ろすそう","name":"claimed to be the case"},{"form":"切り下ろさない","name":"present negative"},{"form":"切り下ろしたい","name":"desire"},{"form":"切り下ろします","name":"present polite"},{"form":"切り下ろしてる","name":"simplified te iru"},{"form":"切り下ろしたり","name":"representative"},{"form":"切り下ろしそう","name":"looks to be the case"},{"form":"切り下ろしかた","name":"way of doing"},{"form":"切り下ろさせる","name":"causative"},{"form":"切り下ろされる","name":"passive"},{"form":"切り下ろしとく","name":"simplified te oku"},{"form":"切り下ろせる","name":"short potential"},{"form":"切り下ろせば","name":"hypothetical"},{"form":"切り下ろそう","name":"pseudo futurum"},{"form":"切り下ろして","name":"te form"},{"form":"切り下ろすな","name":"negative imperative"},{"form":"切り下ろし-","name":"conjunctive"},{"form":"切り下ろした","name":"past"},{"form":"切り下ろせ","name":"commanding"}],"ent_seq":"1383860","readings":["きりおろす"],"text":"切り下ろす"}],"meanings":{"eng":["slash downward","cut down"],"ger":[{"text":"von oben nach unten durchschneiden"}]},"misc":[],"pos":["v5s","vt"]}
{"commonness":0,"ent_seq":"1383950","kana":[{"commonness":0,"conjugated":[{"form":"きりわらないでください","name":"negative request"},{"form":"きりわりませんでした","name":"past polite negative"},{"form":"きりわらなかった","name":"past negative"},{"form":"きりわらせられる","name":"causative passive"},{"form":"きりわるでしょう","name":"polite presumptive"},{"form":"きりわったげる","name":"simplified te ageru"},{"form":"きりわっている","name":"te iru"},{"form":"きりわってある","name":"te aru"},{"form":"きりわりません","name":"present polite negative"},{"form":"きりわっておる","name":"te oru"},{"form":"きりわっておく","name":"te oku"},{"form":"きりわりたがる","name":"other's desire"},{"form":"きりわりました","name":"past polite"},{"form":"きりわるらしい","name":"apparently the case"},{"form":"きりわるだろう","name":"plain presumptive"},{"form":"きりわった","name":"past presumptive"},{"form":"きりわっとる","name":"simplified te oru"},{"form":"きりわるそう","name":"claimed to be the case"},{"form":"きりわらない","name":"present negative"},{"form":"きりわりたい","name":"desire"},{"form":"きりわります","name":"present polite"},{"form":"きりわってる","name":"simplified te iru"},{"form":"きりわったり","name":"representative"},{"form":"きりわりそう","name":"looks to be the case"},{"form":"きりわりかた","name":"way of doing"},{"form":"きりわらせる","name":"causative"},{"form":"きりわられる","name":"passive"},{"form":"きりわっとく","name":"simplified te oku"},{"form":"きりわれる","name":"short potential"},{"form":"きりわれば","name":"hypothetical"},{"form":"きりわろう","name":"pseudo futurum"},{"form":"きりわって","name":"te form"},{"form":"きりわるな","name":"negative imperative"},{"form":"きりわり-","name":"conjunctive"},{"form":"きりわった","name":"past"},{"form":"きりわれ","name":"commanding"}],"ent_seq":"1383950","romaji":"Kiriwaru","text":"きりわる"}],"kanji":[{"commonness":0,"conjugated":[{"form":"切り割らないでください","name":"negative request"},{"form":"切り割りませんでした","name":"past polite negative"},{"form":"切り割らなかった","name":"past negative"},{"form":"切り割らせられる","name":"causative passive"},{"form":"切り割るでしょう","name":"polite presumptive"},{"form":"切り割ったげる","name":"simplified te ageru"},{"form":"切り割っている","name":"te iru"},{"form":"切り割ってある","name":"te aru"},{"form":"切り割りません","name":"present polite negative"},{"form":"切り割っておる","name":"te oru"},{"form":"切り割っておく","name":"te oku"},{"form":"切り割りたがる","name":"other's desire"},{"form":"切り割りました","name":"past polite"},{"form":"切り割るらしい","name":"apparently the case"},{"form":"切り割るだろう","name":"plain presumptive"},{"form":"切り割った","name":"past presumptive"},{"form":"切り割っとる","name":"simplified te oru"},{"form":"切り割るそう","name":"claimed to be the case"},{"form":"切り割らない","name":"present negative"},{"form":"切り割りたい","name":"desire"},{"form":"切り割ります","name":"present polite"},{"form":"切り割ってる","name":"simplified te iru"},{"form":"切り割ったり","name":"representative"},{"form":"切り割りそう","name":"looks to be the case"},{"form":"切り割りかた","name":"way of doing"},{"form":"切り割らせる","name":"causative"},{"form":"切り割られる","name":"passive"},{"form":"切り割っとく","name":"simplified te oku"},{"form":"切り割れる","name":"short potential"},{"form":"切り割れば","name":"hypothetical"},{"form":"切り割ろう","name":"pseudo futurum"},{"form":"切り割って","name":"te form"},{"form":"切り割るな","name":"negative imperative"},{"form":"切り割り-","name":"conjunctive"},{"form":"切り割った","name":"past"},{"form":"切り割れ","name":"commanding"}],"ent_seq":"1383950","readings":["きりわる"],"text":"切り割る"}],"meanings":{"eng":["cut in two"]},"misc":[],"pos":["v5r","vt"]}
{"commonness":10,"ent_seq":"1383960","kana":[{"commonness":5,"ent_seq":"1383960","romaji":"Kiriboshi","text":"きりぼし"}],"kanji":[{"commonness":5,"ent_seq":"1383960","readings":["きりぼし"],"text":"切り干し"},{"commonness":0,"ent_seq":"1383960","readings":["きりぼし"],"text":"切干"},{"commonness":0,"ent_seq":"1383960","readings":["きりぼし"],"text":"切干し"},{"commonness":0,"ent_seq":"1383960","readings":["きりぼし"],"text":"切り乾し"}],"meanings":{"eng":["dried daikon strips"],"ger":[{"text":"getrocknete Rettichschnitzel (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383970","kana":[{"commonness":0,"ent_seq":"1383970","romaji":"Kirigishi","text":"きりぎし"}],"kanji":[{"commonness":0,"ent_seq":"1383970","readings":["きりぎし"],"text":"切り岸"}],"meanings":{"eng":["steep bank","cliff"],"ger":[{"text":"steiler Abgrund (m)"},{"text":"steile Klippe (f)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1383980","kana":[{"commonness":0,"conjugated":[{"form":"きりおこさないでください","name":"negative request"},{"form":"きりおこしませんでした","name":"past polite negative"},{"form":"きりおこさなかった","name":"past negative"},{"form":"きりおこさせられる","name":"causative passive"},{"form":"きりおこすでしょう","name":"polite presumptive"},{"form":"きりおこしたげる","name":"simplified te ageru"},{"form":"きりおこしている","name":"te iru"},{"form":"きりおこしてある","name":"te aru"},{"form":"きりおこしません","name":"present polite negative"},{"form":"きりおこしておる","name":"te oru"},{"form":"きりおこしておく","name":"te oku"},{"form":"きりおこしたがる","name":"other's desire"},{"form":"きりおこしました","name":"past polite"},{"form":"きりおこすらしい","name":"apparently the case"},{"form":"きりおこすだろう","name":"plain presumptive"},{"form":"きりおこしたろう","name":"past presumptive"},{"form":"きりおこしとる","name":"simplified te oru"},{"form":"きりおこすそう","name":"claimed to be the case"},{"form":"きりおこさない","name":"present negative"},{"form":"きりおこしたい","name":"desire"},{"form":"きりおこします","name":"present polite"},{"form":"きりおこしてる","name":"simplified te iru"},{"form":"きりおこしたり","name":"representative"},{"form":"きりおこしそう","name":"looks to be the case"},{"form":"きりおこしかた","name":"way of doing"},{"form":"きりおこさせる","name":"causative"},{"form":"きりおこされる","name":"passive"},{"form":"きりおこしとく","name":"simplified te oku"},{"form":"きりおこせる","name":"short potential"},{"form":"きりおこせば","name":"hypothetical"},{"form":"きりおこそう","name":"pseudo futurum"},{"form":"きりおこして","name":"te form"},{"form":"きりおこすな","name":"negative imperative"},{"form":"きりおこし-","name":"conjunctive"},{"form":"きりおこした","name":"past"},{"form":"きりおこせ","name":"commanding"}],"ent_seq":"1383980","romaji":"Kiriokosu","text":"きりおこす"}],"kanji":[{"commonness":0,"conjugated":[{"form":"切り起こさないでください","name":"negative request"},{"form":"切り起こしませんでした","name":"past polite negative"},{"form":"切り起こさなかった","name":"past negative"},{"form":"切り起こさせられる","name":"causative passive"},{"form":"切り起こすでしょう","name":"polite presumptive"},{"form":"切り起こしたげる","name":"simplified te ageru"},{"form":"切り起こしている","name":"te iru"},{"form":"切り起こしてある","name":"te aru"},{"form":"切り起こしません","name":"present polite negative"},{"form":"切り起こしておる","name":"te oru"},{"form":"切り起こしておく","name":"te oku"},{"form":"切り起こしたがる","name":"other's desire"},{"form":"切り起こしました","name":"past polite"},{"form":"切り起こすらしい","name":"apparently the case"},{"form":"切り起こすだろう","name":"plain presumptive"},{"form":"切り起こしたろう","name":"past presumptive"},{"form":"切り起こしとる","name":"simplified te oru"},{"form":"切り起こすそう","name":"claimed to be the case"},{"form":"切り起こさない","name":"present negative"},{"form":"切り起こしたい","name":"desire"},{"form":"切り起こします","name":"present polite"},{"form":"切り起こしてる","name":"simplified te iru"},{"form":"切り起こしたり","name":"representative"},{"form":"切り起こしそう","name":"looks to be the case"},{"form":"切り起こしかた","name":"way of doing"},{"form":"切り起こさせる","name":"causative"},{"form":"切り起こされる","name":"passive"},{"form":"切り起こしとく","name":"simplified te oku"},{"form":"切り起こせる","name":"short potential"},{"form":"切り起こせば","name":"hypothetical"},{"form":"切り起こそう","name":"pseudo futurum"},{"form":"切り起こして","name":"te form"},{"form":"切り起こすな","name":"negative imperative"},{"form":"切り起こし-","name":"conjunctive"},{"form":"切り起こした","name":"past"},{"form":"切り起こせ","name":"commanding"}],"ent_seq":"1383980","readings":["きりおこす"],"text":"切り起こす"}],"meanings":{"eng":["open up waste land for cultivation"]},"misc":[],"pos":["v5s"]}
{"commonness":10,"ent_seq":"1383990","kana":[{"commonness":5,"ent_seq":"1383990","romaji":"Kiritsume","text":"きりつめ"}],"kanji":[{"commonness":5,"ent_seq":"1383990","readings":["きりつめ"],"text":"切り詰め"}],"meanings":{"eng":["retrenchment","curtailment"]},"misc":[],"pos":["n"]}
{"commonness":37,"ent_seq":"1384000","kana":[{"commonness":10,"conjugated":[{"form":"きりつめないでください","name":"negative request"},{"form":"きりつめませんでした","name":"past polite negative"},{"form":"きりつめなかった","name":"past negative"},{"form":"きりつめさせられる","name":"causative passive"},{"form":"きりつめるでしょう","name":"polite presumptive"},{"form":"きりつめたげる","name":"simplified te ageru"},{"form":"きりつめている","name":"te iru"},{"form":"きりつめてある","name":"te aru"},{"form":"きりつめません","name":"present polite negative"},{"form":"きりつめておる","name":"te oru"},{"form":"きりつめておく","name":"te oku"},{"form":"きりつめたがる","name":"other's desire"},{"form":"きりつめました","name":"past polite"},{"form":"きりつめるらしい","name":"apparently the case"},{"form":"きりつめるだろう","name":"plain presumptive"},{"form":"きりつめたろう","name":"past presumptive"},{"form":"きりつめとる","name":"simplified te oru"},{"form":"きりつめるそう","name":"claimed to be the case"},{"form":"きりつめない","name":"present negative"},{"form":"きりつめたい","name":"desire"},{"form":"きりつめます","name":"present polite"},{"form":"きりつめてる","name":"simplified te iru"},{"form":"きりつめたり","name":"representative"},{"form":"きりつめそう","name":"looks to be the case"},{"form":"きりつめかた","name":"way of doing"},{"form":"きりつめさせる","name":"causative"},{"form":"きりつめられる","name":"passive"},{"form":"きりつめとく","name":"simplified te oku"},{"form":"きりつめ","name":"short potential"},{"form":"きりつめれば","name":"hypothetical"},{"form":"きりつめよう","name":"pseudo futurum"},{"form":"きりつめて","name":"te form"},{"form":"きりつめるな","name":"negative imperative"},{"form":"きりつめ-","name":"conjunctive"},{"form":"きりつめた","name":"past"},{"form":"きりつめろ","name":"commanding"}],"ent_seq":"1384000","romaji":"Kiritsumeru","text":"きりつめる"}],"kanji":[{"commonness":27,"conjugated":[{"form":"切り詰めないでください","name":"negative request"},{"form":"切り詰めませんでした","name":"past polite negative"},{"form":"切り詰めなかった","name":"past negative"},{"form":"切り詰めさせられる","name":"causative passive"},{"form":"切り詰めるでしょう","name":"polite presumptive"},{"form":"切り詰めたげる","name":"simplified te ageru"},{"form":"切り詰めている","name":"te iru"},{"form":"切り詰めてある","name":"te aru"},{"form":"切り詰めません","name":"present polite negative"},{"form":"切り詰めておる","name":"te oru"},{"form":"切り詰めておく","name":"te oku"},{"form":"切り詰めたがる","name":"other's desire"},{"form":"切り詰めました","name":"past polite"},{"form":"切り詰めるらしい","name":"apparently the case"},{"form":"切り詰めるだろう","name":"plain presumptive"},{"form":"切り詰めたろう","name":"past presumptive"},{"form":"切り詰めとる","name":"simplified te oru"},{"form":"切り詰めるそう","name":"claimed to be the case"},{"form":"切り詰めない","name":"present negative"},{"form":"切り詰めたい","name":"desire"},{"form":"切り詰めます","name":"present polite"},{"form":"切り詰めてる","name":"simplified te iru"},{"form":"切り詰めたり","name":"representative"},{"form":"切り詰めそう","name":"looks to be the case"},{"form":"切り詰めかた","name":"way of doing"},{"form":"切り詰めさせる","name":"causative"},{"form":"切り詰められる","name":"passive"},{"form":"切り詰めとく","name":"simplified te oku"},{"form":"切り詰め","name":"short potential"},{"form":"切り詰めれば","name":"hypothetical"},{"form":"切り詰めよう","name":"pseudo futurum"},{"form":"切り詰めて","name":"te form"},{"form":"切り詰めるな","name":"negative imperative"},{"form":"切り詰め-","name":"conjunctive"},{"form":"切り詰めた","name":"past"},{"form":"切り詰めろ","name":"commanding"}],"ent_seq":"1384000","readings":["きりつめる"],"text":"切り詰める"},{"commonness":0,"conjugated":[{"form":"切詰めないでください","name":"negative request"},{"form":"切詰めませんでした","name":"past polite negative"},{"form":"切詰めなかった","name":"past negative"},{"form":"切詰めさせられる","name":"causative passive"},{"form":"切詰めるでしょう","name":"polite presumptive"},{"form":"切詰めたげる","name":"simplified te ageru"},{"form":"切詰めている","name":"te iru"},{"form":"切詰めてある","name":"te aru"},{"form":"切詰めません","name":"present polite negative"},{"form":"切詰めておる","name":"te oru"},{"form":"切詰めておく","name":"te oku"},{"form":"切詰めたがる","name":"other's desire"},{"form":"切詰めました","name":"past polite"},{"form":"切詰めるらしい","name":"apparently the case"},{"form":"切詰めるだろう","name":"plain presumptive"},{"form":"切詰めたろう","name":"past presumptive"},{"form":"切詰めとる","name":"simplified te oru"},{"form":"切詰めるそう","name":"claimed to be the case"},{"form":"切詰めない","name":"present negative"},{"form":"切詰めたい","name":"desire"},{"form":"切詰めます","name":"present polite"},{"form":"切詰めてる","name":"simplified te iru"},{"form":"切詰めたり","name":"representative"},{"form":"切詰めそう","name":"looks to be the case"},{"form":"切詰めかた","name":"way of doing"},{"form":"切詰めさせる","name":"causative"},{"form":"切詰められる","name":"passive"},{"form":"切詰めとく","name":"simplified te oku"},{"form":"切詰め","name":"short potential"},{"form":"切詰めれば","name":"hypothetical"},{"form":"切詰めよう","name":"pseudo futurum"},{"form":"切詰めて","name":"te form"},{"form":"切詰めるな","name":"negative imperative"},{"form":"切詰め-","name":"conjunctive"},{"form":"切詰めた","name":"past"},{"form":"切詰めろ","name":"commanding"}],"ent_seq":"1384000","readings":["きりつめる"],"text":"切詰める"}],"meanings":{"eng":["shorten","cut short","trim","cut down on","reduce","economize","economise"],"ger":[{"text":"kürzen"},{"text":"reduzieren"},{"text":"drosseln"},{"text":"kleiner machen"},{"text":"einschränken"},{"text":"herabsetzen"},{"text":"vermindern"},{"text":"verringern"}]},"misc":[],"pos":["v1","vt"]}
{"commonness":0,"ent_seq":"1384010","kana":[{"commonness":0,"conjugated":[{"form":"きりさらないでください","name":"negative request"},{"form":"きりさりませんでした","name":"past polite negative"},{"form":"きりさらなかった","name":"past negative"},{"form":"きりさらせられる","name":"causative passive"},{"form":"きりさるでしょう","name":"polite presumptive"},{"form":"きりさったげる","name":"simplified te ageru"},{"form":"きりさっている","name":"te iru"},{"form":"きりさってある","name":"te aru"},{"form":"きりさりません","name":"present polite negative"},{"form":"きりさっておる","name":"te oru"},{"form":"きりさっておく","name":"te oku"},{"form":"きりさりたがる","name":"other's desire"},{"form":"きりさりました","name":"past polite"},{"form":"きりさるらしい","name":"apparently the case"},{"form":"きりさるだろう","name":"plain presumptive"},{"form":"きりさった","name":"past presumptive"},{"form":"きりさっとる","name":"simplified te oru"},{"form":"きりさるそう","name":"claimed to be the case"},{"form":"きりさらない","name":"present negative"},{"form":"きりさりたい","name":"desire"},{"form":"きりさります","name":"present polite"},{"form":"きりさってる","name":"simplified te iru"},{"form":"きりさったり","name":"representative"},{"form":"きりさりそう","name":"looks to be the case"},{"form":"きりさりかた","name":"way of doing"},{"form":"きりさらせる","name":"causative"},{"form":"きりさられる","name":"passive"},{"form":"きりさっとく","name":"simplified te oku"},{"form":"きりされる","name":"short potential"},{"form":"きりされば","name":"hypothetical"},{"form":"きりさろう","name":"pseudo futurum"},{"form":"きりさって","name":"te form"},{"form":"きりさるな","name":"negative imperative"},{"form":"きりさり-","name":"conjunctive"},{"form":"きりさった","name":"past"},{"form":"きりされ","name":"commanding"}],"ent_seq":"1384010","romaji":"Kirisaru","text":"きりさる"}],"kanji":[{"commonness":0,"conjugated":[{"form":"切り去らないでください","name":"negative request"},{"form":"切り去りませんでした","name":"past polite negative"},{"form":"切り去らなかった","name":"past negative"},{"form":"切り去らせられる","name":"causative passive"},{"form":"切り去るでしょう","name":"polite presumptive"},{"form":"切り去ったげる","name":"simplified te ageru"},{"form":"切り去っている","name":"te iru"},{"form":"切り去ってある","name":"te aru"},{"form":"切り去りません","name":"present polite negative"},{"form":"切り去っておる","name":"te oru"},{"form":"切り去っておく","name":"te oku"},{"form":"切り去りたがる","name":"other's desire"},{"form":"切り去りました","name":"past polite"},{"form":"切り去るらしい","name":"apparently the case"},{"form":"切り去るだろう","name":"plain presumptive"},{"form":"切り去った","name":"past presumptive"},{"form":"切り去っとる","name":"simplified te oru"},{"form":"切り去るそう","name":"claimed to be the case"},{"form":"切り去らない","name":"present negative"},{"form":"切り去りたい","name":"desire"},{"form":"切り去ります","name":"present polite"},{"form":"切り去ってる","name":"simplified te iru"},{"form":"切り去ったり","name":"representative"},{"form":"切り去りそう","name":"looks to be the case"},{"form":"切り去りかた","name":"way of doing"},{"form":"切り去らせる","name":"causative"},{"form":"切り去られる","name":"passive"},{"form":"切り去っとく","name":"simplified te oku"},{"form":"切り去れる","name":"short potential"},{"form":"切り去れば","name":"hypothetical"},{"form":"切り去ろう","name":"pseudo futurum"},{"form":"切り去って","name":"te form"},{"form":"切り去るな","name":"negative imperative"},{"form":"切り去り-","name":"conjunctive"},{"form":"切り去った","name":"past"},{"form":"切り去れ","name":"commanding"}],"ent_seq":"1384010","readings":["きりさる"],"text":"切り去る"}],"meanings":{"eng":["cut off"]},"misc":[],"pos":["v5r"]}
{"commonness":0,"ent_seq":"1384020","kana":[{"commonness":0,"ent_seq":"1384020","romaji":"Kirikyougen","text":"きりきょうげん"}],"kanji":[{"commonness":0,"ent_seq":"1384020","readings":["きりきょうげん"],"text":"切狂言"},{"commonness":0,"ent_seq":"1384020","readings":["きりきょうげん"],"text":"切り狂言"}],"meanings":{"eng":["last piece in a kabuki programme"],"ger":[{"text":"letztes Stück (einer Kabuki-Vorführung) (n)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1384030","kana":[{"commonness":0,"ent_seq":"1384030","romaji":"Kirikuzu","text":"きりくず"}],"kanji":[{"commonness":0,"ent_seq":"1384030","readings":["きりくず"],"text":"切りくず"},{"commonness":0,"ent_seq":"1384030","readings":["きりくず"],"text":"切り屑"}],"meanings":{"eng":["scraps","chips"],"ger":[{"text":"Schnitzel (n)"},{"text":"Papierfetzen (m)"},{"text":"Späne (m)"},{"text":"Abfall (m)"}]},"misc":[],"pos":["n"]}
{"commonness":0,"ent_seq":"1384040","kana":[{"commonness":0,"ent_seq":"1384040","romaji":"Kiritsugi","text":"きりつぎ"}],"kanji":[{"commonness":0,"ent_seq":"1384040","readings":["きりつぎ"],"text":"切り継ぎ"},{"commonness":0,"ent_seq":"1384040","readings":["きりつぎ"],"text":"切り接ぎ"},{"commonness":0,"ent_seq":"1384040","readings":["きりつぎ"],"text":"切継ぎ"},{"commonness":0,"ent_seq":"1384040","readings":["きりつぎ"],"text":"切接ぎ"}],"meanings":{"eng":["cutting and patching","splicing","grafting"],"ger":[{"rank":1,"text":"Abschneiden und (n) Verbinden"},{"rank":2,"text":"Kiritsugi-Pfropfmethode (f)"}]},"misc":[],"pos":["n","vs"]}
{"commonness":0,"ent_seq":"1384050","kana":[{"commonness":0,"conjugated":[{"form":"きりむすばないでください","name":"negative request"},{"form":"きりむすびませんでした","name":"past polite negative"},{"form":"きりむすばなかった","name":"past negative"},{"form":"きりむすばせられる","name":"causative passive"},{"form":"きりむすぶでしょう","name":"polite presumptive"},{"form":"きりむすんだげる","name":"simplified te ageru"},{"form":"きりむすんでいる","name":"te iru"},{"form":"きりむすんである","name":"te aru"},{"form":"きりむすびません","name":"present polite negative"},{"form":"きりむすんでおる","name":"te oru"},{"form":"きりむすんでおく","name":"te oku"},{"form":"きりむすびたがる","name":"other's desire"},{"form":"きりむすびました","name":"past polite"},{"form":"きりむすぶらしい","name":"apparently the case"},{"form":"きりむすぶだろう","name":"plain presumptive"},{"form":"きりむすんだろう","name":"past presumptive"},{"form":"きりむすんどる","name":"simplified te oru"},{"form":"きりむすぶそう","name":"claimed to be the case"},{"form":"きりむすばない","name":"present negative"},{"form":"きりむすびたい","name":"desire"},{"form":"きりむすびます","name":"present polite"},{"form":"きりむすんでる","name":"simplified te iru"},{"form":"きりむすんだり","name":"representative"},{"form":"きりむすびそう","name":"looks to be the case"},{"form":"きりむすびかた","name":"way of doing"},{"form":"きりむすばせる","name":"causative"},{"form":"きりむすばれる","name":"passive"},{"form":"きりむすんどく","name":"simplified te oku"},{"form":"きりむすべる","name":"short potential"},{"form":"きりむすべば","name":"hypothetical"},{"form":"きりむすぼう","name":"pseudo futurum"},{"form":"きりむすんで","name":"te form"},{"form":"きりむすぶな","name":"negative imperative"},{"form":"きりむすび-","name":"conjunctive"},{"form":"きりむすんだ","name":"past"},{"form":"きりむすべ","name":"commanding"}],"ent_seq":"1384050","romaji":"Kirimusubu","text":"きりむすぶ"}],"kanji":[{"commonness":0,"conjugated":[{"form":"切り結ばないでください","name":"negative request"},{"form":"切り結びませんでした","name":"past polite negative"},{"form":"切り結ばなかった","name":"past negative"},{"form":"切り結ばせられる","name":"causative passive"},{"form":"切り結ぶでしょう","name":"polite presumptive"},{"form":"切り結んだげる","name":"simplified te ageru"},{"form":"切り結んでいる","name":"te iru"},{"form":"切り結んである","name":"te aru"},{"form":"切り結びません","name":"present polite negative"},{"form":"切り結んでおる","name":"te oru"},{"form":"切り結んでおく","name":"te oku"},{"form":"切り結びたがる","name":"other's desire"},{"form":"切り結びました","name":"past polite"},{"form":"切り結ぶらしい","name":"apparently the case"},{"form":"切り結ぶだろう","name":"plain presumptive"},{"form":"切り結んだろう","name":"past presumptive"},{"form":"切り結んどる","name":"simplified te oru"},{"form":"切り結ぶそう","name":"claimed to be the case"},{"form":"切り結ばない","name":"present negative"},{"form":"切り結びたい","name":"desire"},{"form":"切り結びます","name":"present polite"},{"form":"切り結んでる","name":"simplified te iru"},{"form":"切り結んだり","name":"representative"},{"form":"切り結びそう","name":"looks to be the case"},{"form":"切り結びかた","name":"way of doing"},{"form":"切り結ばせる","name":"causative"},{"form":"切り結ばれる","name":"passive"},{"form":"切り結んどく","name":"simplified te oku"},{"form":"切り結べる","name":"short potential"},{"form":"切り結べば","name":"hypothetical"},{"form":"切り結ぼう","name":"pseudo futurum"},{"form":"切り結んで","name":"te form"},{"form":"切り結ぶな","name":"negative imperative"},{"form":"切り結び-","name":"conjunctive"},{"form":"切り結んだ","name":"past"},{"form":"切り結べ","name":"commanding"}],"ent_seq":"1384050","readings":["きりむすぶ"],"text":"切り結ぶ"}],"meanings":{"eng":["cross swords with"],"ger":[{"text":"die Klingen kreuzen"}]},"misc":[],"pos":["v5b","vi"]}
{"commonness":0,"ent_seq":"1384060","kana":[{"commonness":0,"conjugated":[{"form":"きりまくらないでください","name":"negative request"},{"form":"きりまくりませんでした","name":"past polite negative"},{"form":"きりまくらなかった","name":"past negative"},{"form":"きりまくらせられる","name":"causative passive"},{"form":"きりまくるでしょう","name":"polite presumptive"},{"form":"きりまくったげる","name":"simplified te ageru"},{"form":"きりまくっている","name":"te iru"},{"form":"きりまくってある","name":"te aru"},{"form":"きりまくりません","name":"present polite negative"},{"form":"きりまくっておる","name":"te oru"},{"form":"きりまくっておく","name":"te oku"},{"form":"きりまくりたがる","name":"other's desire"},{"form":"きりまくりました","name":"past polite"},{"form":"きりまくるらしい","name":"apparently the case"},{"form":"きりまくるだろう","name":"plain presumptive"},{"form":"きりまくった","name":"past presumptive"},{"form":"きりまくっとる","name":"simplified te oru"},{"form":"きりまくるそう","name":"claimed to be the case"},{"form":"きりまくらない","name":"present negative"},{"form":"きりまくりたい","name":"desire"},{"form":"きりまくります","name":"present polite"},{"form":"きりまくってる","name":"simplified te iru"},{"form":"きりまくったり","name":"representative"},{"form":"きりまくりそう","name":"looks to be the case"},{"form":"きりまくりかた","name":"way of doing"},{"form":"きりまくらせる","name":"causative"},{"form":"きりまくられる","name":"passive"},{"form":"きりまくっとく","name":"simplified te oku"},{"form":"きりまくれる","name":"short potential"},{"form":"きりまくれば","name":"hypothetical"},{"form":"きりまくろう","name":"pseudo futurum"},{"form":"きりまくって","name":"te form"},{"form":"きりまくるな","name":"negative imperative"},{"form":"きりまくり-","name":"conjunctive"},{"form":"きりまくった","name":"past"},{"form":"きりまくれ","name":"commanding"}],"ent_seq":"1384060","romaji":"Kirimakuru","text":"きりまくる"}],"kanji":[{"commonness":0,"conjugated":[{"form":"切りまくらないでください","name":"negative request"},{"form":"切りまくりませんでした","name":"past polite negative"},{"form":"切りまくらなかった","name":"past negative"},{"form":"切りまくらせられる","name":"causative passive"},{"form":"切りまくるでしょう","name":"polite presumptive"},{"form":"切りまくったげる","name":"simplified te ageru"},{"form":"切りまくっている","name":"te iru"},{"form":"切りまくってある","name":"te aru"},{"form":"切りまくりません","name":"present polite negative"},{"form":"切りまくっておる","name":"te oru"},{"form":"切りまくっておく","name":"te oku"},{"form":"切りまくりたがる","name":"other's desire"},{"form":"切りまくりました","name":"past polite"},{"form":"切りまくるらしい","name":"apparently the case"},{"form":"切りまくるだろう","name":"plain presumptive"},{"form":"切りまくった","name":"past presumptive"},{"form":"切りまくっとる","name":"simplified te oru"},{"form":"切りまくるそう","name":"claimed to be the case"},{"form":"切りまくらない","name":"present negative"},{"form":"切りまくりたい","name":"desire"},{"form":"切りまくります","name":"present polite"},{"form":"切りまくってる","name":"simplified te iru"},{"form":"切りまくったり","name":"representative"},{"form":"切りまくりそう","name":"looks to be the case"},{"form":"切りまくりかた","name":"way of doing"},{"form":"切りまくらせる","name":"causative"},{"form":"切りまくられる","name":"passive"},{"form":"切りまくっとく","name":"simplified te oku"},{"form":"切りまくれる","name":"short potential"},{"form":"切りまくれば","name":"hypothetical"},{"form":"切りまくろう","name":"pseudo futurum"},{"form":"切りまくって","name":"te form"},{"form":"切りまくるな","name":"negative imperative"},{"form":"切りまくり-","name":"conjunctive"},{"form":"切りまくった","name":"past"},{"form":"切りまくれ","name":"commanding"}],"ent_seq":"1384060","readings":["きりまくる"],"text":"切りまくる"},{"commonness":0,"conjugated":[{"form":"切り捲らないでください","name":"negative request"},{"form":"切り捲りませんでした","name":"past polite negative"},{"form":"切り捲らなかった","name":"past negative"},{"form":"切り捲らせられる","name":"causative passive"},{"form":"切り捲るでしょう","name":"polite presumptive"},{"form":"切り捲ったげる","name":"simplified te ageru"},{"form":"切り捲っている","name":"te iru"},{"form":"切り捲ってある","name":"te aru"},{"form":"切り捲りません","name":"present polite negative"},{"form":"切り捲っておる","name":"te oru"},{"form":"切り捲っておく","name":"te oku"},{"form":"切り捲りたがる","name":"other's desire"},{"form":"切り捲りました","name":"past polite"},{"form":"切り捲るらしい","name":"apparently the case"},{"form":"切り捲るだろう","name":"plain presumptive"},{"form":"切り捲った","name":"past presumptive"},{"form":"切り捲っとる","name":"simplified te oru"},{"form":"切り捲るそう","name":"claimed to be the case"},{"form":"切り捲らない","name":"present negative"},{"form":"切り捲りたい","name":"desire"},{"form":"切り捲ります","name":"present polite"},{"form":"切り捲ってる","name":"simplified te iru"},{"form":"切り捲ったり","name":"representative"},{"form":"切り捲りそう","name":"looks to be the case"},{"form":"切り捲りかた","name":"way of doing"},{"form":"切り捲らせる","name":"causative"},{"form":"切り捲られる","name":"passive"},{"form":"切り捲っとく","name":"simplified te oku"},{"form":"切り捲れる","name":"short potential"},{"form":"切り捲れば","name":"hypothetical"},{"form":"切り捲ろう","name":"pseudo futurum"},{"form":"切り捲って","name":"te form"},{"form":"切り捲るな","name":"negative imperative"},{"form":"切り捲り-","name":"conjunctive"},{"form":"切り捲った","name":"past"},{"form":"切り捲れ","name":"commanding"}],"ent_seq":"1384060","readings":["きりまくる"],"text":"切り捲る"}],"meanings":{"eng":["attack and scatter","argue vehemently"],"ger":[{"text":"um sich schlagen"},{"text":"umherschlagen"},{"text":"wild argumentieren"}]},"misc":[],"pos":["v5r","vt"]}

`

function addText(text) {
    // let body = document.querySelectorAll('body');
    var div = document.createElement("div");
    div.innerHTML = text;

    div.style["font-size"] = "40px";

    document.getElementById("body").appendChild(div);
}
// function addRow(col1, col2, col3) {
//     // 
//     var tr = document.createElement("tr");
//     tr.style["font-size"] = "40px";

//     var td = document.createElement("td");
//     td.innerHTML = col1;
//     tr.appendChild(td);

//     var td = document.createElement("td");
//     td.innerHTML = col2;
//     tr.appendChild(td);

//     var td = document.createElement("td");
//     td.innerHTML = col3;
//     tr.appendChild(td);

//     document.querySelectorAll('tbody')[0].appendChild(tr);
// }

async function benchmark_jszip_compression(argument) {

    let total_bytes = 0;
    var time0 = performance.now();
    for (let i = 0; i < 1000; i++) {
        var zip = new JSZip();
        zip.file("a", test_input);

        await zip.generateAsync({type: "uint8array"}).then(function (u8) {
            // ...
        });

        // const compressed = wasm.compress(test_input_bytes);
        total_bytes += test_input.length;
    }

    var time_in_ms = performance.now() - time0;

    let total_mb = total_bytes / 1000000;
    let time_in_s = time_in_ms / 1000;

    // alert(total_mb / time_in_s  + "MB/s")

}


async function benchmark_lz4_compression(argument) {

    let enc = new TextEncoder();

    // 200 MB/s
    let test_input_bytes = enc.encode(test_input);
    const compressed = wasm.compress(test_input_bytes);
    let total_bytes = 0;
    var time0 = performance.now();
    for (let i = 0; i < 5000; i++) {
        const compressed = wasm.compress(test_input_bytes);
        total_bytes += test_input_bytes.length;
    }

    var time_in_ms = performance.now() - time0;

    let total_mb = total_bytes / 1000000;
    let time_in_s = time_in_ms / 1000;

    console.log(compressed)

    addText("lz4 wasm compression: " + (total_mb / time_in_s).toFixed(2)  + "MB/s" + " Ratio: " + (compressed.length / test_input_bytes.length).toFixed(2) )

    // alert(total_mb / time_in_s  + "MB/s")

}


async function benchmark_lz4_decompression(argument) {

    // 600MB/s
    let enc = new TextEncoder();
    let test_input_bytes = enc.encode(test_input);
    let total_bytes = 0;
    var time0 = performance.now();
    const compressed = wasm.compress(test_input_bytes);
    for (let i = 0; i < 1000; i++) {
        const original = wasm.decompress(compressed);
        total_bytes += original.length;
    }

    var time_in_ms = performance.now() - time0;

    let total_mb = total_bytes / 1000000;
    let time_in_s = time_in_ms / 1000;

    addText("lz4 wasm decompression: " + parseFloat("" + total_mb / time_in_s).toFixed(2)  + "MB/s" + " Ratio: " + (compressed.length / test_input_bytes.length).toFixed(2))
    // alert(total_mb / time_in_s  + "MB/s")

}


function benchmark_lz4_js_compression() {
 
    // LZ4 can only work on Buffers
    var test_input_bytes = Buffer.from(test_input)

    var output = Buffer.alloc( lz4js.compressBound(test_input_bytes.length) )
    var compressedSize = lz4js.compress(test_input_bytes, output)

    let total_bytes = 0;
    var time0 = performance.now();
    for (let i = 0; i < 1000; i++) {
        var output = Buffer.alloc( lz4js.compressBound(test_input_bytes.length) )
        var compressedSize = lz4js.compress(test_input_bytes, output)
        output = output.slice(0, compressedSize)
        total_bytes += test_input_bytes.length;
    }
 
    var time_in_ms = performance.now() - time0;
 
    let total_mb = total_bytes / 1000000;
    let time_in_s = time_in_ms / 1000;
 
    console.log("lz4_comp_js: " + total_mb / time_in_s  + "MB/s")

    addText("lz4 (js) compression: " + parseFloat("" + total_mb / time_in_s).toFixed(2)  + "MB/s"+ " Ratio: " + (compressedSize / test_input_bytes.length).toFixed(2))
 
}

function benchmark_lz4_js_decompression(argument) {
 
    // LZ4 can only work on Buffers
    var test_input_bytes = Buffer.from(test_input)

    let total_bytes = 0;
    var time0 = performance.now();
    var output = Buffer.alloc( lz4js.compressBound(test_input_bytes.length) )
    var compressedSize = lz4js.compress(test_input_bytes, output)
    output = output.slice(0, compressedSize)

    for (let i = 0; i < 1000; i++) {
        var uncompressed = Buffer.alloc(test_input_bytes.length)
        var uncompressedSize = lz4js.uncompress(output, uncompressed)
        uncompressed = uncompressed.slice(0, uncompressedSize)
        total_bytes += uncompressedSize;
    }
 
    var time_in_ms = performance.now() - time0;
 
    let total_mb = total_bytes / 1000000;
    let time_in_s = time_in_ms / 1000;
 
    console.log("lz4_decomp_js: " +total_mb / time_in_s  + "MB/s")

    addText("lz4 (js) decompression: " + parseFloat("" + total_mb / time_in_s).toFixed(2)  + "MB/s"+ " Ratio: " + (compressedSize / test_input_bytes.length).toFixed(2))
 
}


function benchmark_fflate_compression() {
 
    // LZ4 can only work on Buffers
    var test_input_bytes = Buffer.from(test_input)

    var output = Buffer.alloc( lz4js.compressBound(test_input_bytes.length) )
    var compressed = fflate.zlibSync(test_input_bytes, { level: 1 });

    let total_bytes = 0;
    var time0 = performance.now();
    for (let i = 0; i < 100; i++) {
        const notSoMassive = fflate.zlibSync(test_input_bytes, { level: 1 });
        total_bytes += notSoMassive.length;
    }
 
    var time_in_ms = performance.now() - time0;
 
    let total_mb = total_bytes / 1000000;
    let time_in_s = time_in_ms / 1000;
 
    console.log("lz4_comp_js: " + total_mb / time_in_s  + "MB/s")

    addText("fflate (zlib) compression: " + parseFloat("" + total_mb / time_in_s).toFixed(2)  + "MB/s"+ " Ratio: " + (compressed.length / test_input_bytes.length).toFixed(2))
 
}

function benchmark_fflate_decompression() {
 
    // LZ4 can only work on Buffers
    var test_input_bytes = Buffer.from(test_input)

    var output = Buffer.alloc( lz4js.compressBound(test_input_bytes.length) )
    var compressed = fflate.zlibSync(test_input_bytes, { level: 1 });

    let total_bytes = 0;
    var time0 = performance.now();
    for (let i = 0; i < 100; i++) {
        const massiveAgain = fflate.unzlibSync(compressed);
        total_bytes += massiveAgain.length;
    }
 
    var time_in_ms = performance.now() - time0;
 
    let total_mb = total_bytes / 1000000;
    let time_in_s = time_in_ms / 1000;
 
    console.log("lz4_comp_js: " + total_mb / time_in_s  + "MB/s")

    addText("fflate (zlib) decompression: " + parseFloat("" + total_mb / time_in_s).toFixed(2)  + "MB/s"+ " Ratio: " + (compressed.length / test_input_bytes.length).toFixed(2))
 
}




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run(argument) {
    addText("Starting Benchmark..")
    // benchmark_jszip_compression();

    await sleep(10)
    benchmark_lz4_compression()
    await sleep(10)
    benchmark_lz4_decompression();
    await sleep(10)
    benchmark_lz4_js_compression();
    await sleep(10)
    benchmark_lz4_js_decompression();
    await sleep(10)
    benchmark_fflate_compression();
    await sleep(10)
    benchmark_fflate_decompression();
    await sleep(10)

    addText("Finished")

}

run()