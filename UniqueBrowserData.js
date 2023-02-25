const CustomRuler = {
    rulerData: [
        ['1', 'a|b'],
        ['0', 'c|d'],
        ['2', 'e|f'],
        ['3', 'g|h'],
        ['4', 'j|k'],
        ['5', 'l|m'],
        ['6', 'n|o'],
        ['7', 'p|r'],
        ['8', 's|t'],
        ['9', 'v|x']
    ],
    findByOne: (arr, iterator) => {
        return arr.find(d => d[0] == iterator)[1];
    },
    findByOneDes: (arr, iterator) => {
        return arr.find (d => d[1].split("|")[0] == iterator || d[1].split("|")[1] == iterator)
    },
    deserealize: (str) => {

        str = str.split("");
        let str_ = "";

        for(let i = 0; i < str.length; i++) {
            if(str[i] == "-") continue;

            str_ += str[i]
        }

        let stringImpl = "";
        
        for(let i = 0; i < str_.length; i++) {
            if(isNaN(str_[i])) {
                console.log(str_[i],CustomRuler.findByOneDes(CustomRuler.rulerData, str_[i]))
                stringImpl += CustomRuler.findByOneDes(CustomRuler.rulerData, str_[i])[0];
            }else stringImpl += str_[i];
        }

        return stringImpl
    },
    replaceData: (numStr) => {
      
        
        numStr = String(numStr).split("");

        let stringImpl = "", lastReminder = 0;
        for(let i = 0; i < numStr.length; i++) {
            if(i % Math.floor(4 + Math.random() * 2) == 0) {
                const esq = CustomRuler.findByOne(CustomRuler.rulerData, numStr[i]).split("|");
                stringImpl += esq[Math.floor(Math.random() * esq.length)] + ((i < 0 || i >= numStr.length - 1) ? "" : "-");
            }else {
                stringImpl += numStr[i];
            }
          
        }

        return stringImpl;
    }
}


class UniqueBrowserData {
    static getRawData () {
        const buff_data = ['navigator', 'screen']
        const navigatorInfo = window[buff_data[0]],
              screenInfo = window[buff_data[1]];
    
        let uniqueId = navigatorInfo.mimeTypes.length;
        uniqueId += navigatorInfo.userAgent.replace(/\D+/g, '');
        uniqueId += navigatorInfo.plugins.length;
        uniqueId += screenInfo.height || '';
        uniqueId += screenInfo.width || '';
        uniqueId += screenInfo.pixelDepth || '';
    
        return uniqueId;
    }
    static deserealizeData (data) {
        return CustomRuler.deserealize(data)
    }
    static getUniqueBrowserId () {
        return CustomRuler.replaceData(UniqueBrowserData.getRawData());
    }
}
