export function getItemFromHash(item) {
   const hash = new URLSearchParams(window.location.hash.substring(1));
   return hash.get(item);
}

export function updateUrlHash(item, value) {
   const urlParams = new URLSearchParams();
   urlParams.append(item, value);
   window.location.hash = urlParams.toString();
}
