const str =
  "82..4..6...16..87..78315.h47.157.............53..4...76.415..81..7632..3...28.51";

const detectUndeChars = (str) => {
  let chars = [];
  const getUniqueChars = () => {
    for (const char of str) {
      if (!chars.includes(char)) {
        chars.push(char);
      }
    }
  };
  getUniqueChars(str);
  chars = chars.sort();
  chars.shift();
  console.log(
    chars
      .sort()
      .join("")
      .match(/\b[123456789]*\b/) != ""
  );
};

detectUndeChars(str);
