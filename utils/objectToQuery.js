export default (object) =>
{
    return '?' + Object.keys(object).filter(name => object[name]).map(name => `${ name }=${ object[name] }`).join('&');
};