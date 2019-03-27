// Filter function that filters and updates items
function filter(items) {
  var newItems = [];
  if (items && items.length) {
    newItems = items
      .filter(item => item.count && item.count > 1)
      .map(item => {
        const newItem = {
          name: item.name,
          count: item.count,
          thumbnail: getCorrectThumbnail(item)
        };
        return newItem;
      });
  }

  return newItems;
}

// Select correct thumbnail url
function getCorrectThumbnail(thumbnail) {
  const correctLogo = thumbnail.logos.find(logo => {
    // 64x64 => [64,64]
    const sizeArray = logo.size.split("x");
    if (
      sizeArray.length === 2 &&
      checkSize(sizeArray[0]) &&
      checkSize(sizeArray[1])
    ) {
      return true;
    }

    return false;
  });

  return correctLogo ? correctLogo.url : "";
}

// Check if size of logo is correct
function checkSize(size) {
  return size >= 64 && size <= 128;
}

module.exports = filter;
