export function BiMapInterface () {
    this.foreignMapOf = {};

    
    this.inverse = () => {
        const reversedObject = {};

        for(const objectRow in this.foreignMapOf) {
            reversedObject[this.foreignMapOf[objectRow]] = objectRow;
        }
        
        const predicatedBiInterface = new BiMapInterface();
        predicatedBiInterface.foreignMapOf = reversedObject;

        return predicatedBiInterface;
    }

    this.get = (key) => {
        return this.foreignMapOf[key];
    }

    this.put = (key , value) => {
        if(this.foreignMapOf[key] != null) {
            throw new SyntaxError("foreign map has value");
        }
        this.foreignMapOf[key] = value;
    }
    this.putReplacable = (key , value) => {
        this.foreignMapOf[key] = value;
    }
    
}
