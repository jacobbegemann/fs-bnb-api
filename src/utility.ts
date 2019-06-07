export class Utility {

  static base64encode(s: string) {
    return (new Buffer(s)).toString('base64');
  }

  static base64decode(s: string) {
    return (new Buffer(s, 'base64')).toString();
  }

}
