export class Pizza {

    public id: number;

    constructor(public name: string,
                public price: number,
                public available: boolean,
                public description: string,
                public imagePath: string) {
                    this.id = Pizza.idCounter++;
                }

    private static idCounter = 0;
}