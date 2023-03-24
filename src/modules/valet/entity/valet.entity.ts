export class ValetEntity {

  public id: number;

  public assets: Asset[];

}

class Asset {

  public count: number;

  public cost: number;

  public pair: Pair;

}

class Pair {

  public name: string;

}
