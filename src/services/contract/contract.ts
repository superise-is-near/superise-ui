
class NearViewMethod {

}
class NearChangeMethod {

}
interface Methods<T> {
    [key: string]: T;
}
interface ChangeMethod {
    [key: string]: NearChangeMethod;
}
interface Contract {

    viewMethods(): Methods<NearViewMethod>;
    changeMethods(): Methods<NearChangeMethod>;
}