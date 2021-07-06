const searchParams = new URLSearchParams([
  ["foo", "bar"],
  ["foo", "world"],
]);

for (const [key, value] of searchParams) {
  console.log(key, value);
}

// Logs "foo=bar&foo=hello"
console.log(searchParams.toString());

// key が重複してるときに Object.fromEntries 使うのは注意
// To { foo: 'hello' }
const data = Object.fromEntries(searchParams);
console.log(data);

/* url.searchParams */
const url = new URL("https://jakearchibald.com/?foo=bar&hello=world");

// Logs 'world'
console.log(url.searchParams.get("hello"));

/* URLsearchParams as a Fetch body */

const value = "hello&world";
const badEncoding = `text=${value}`;

// 😬 Logs [['text', 'hello'], ['world', '']]
console.log([...new URLSearchParams(badEncoding)]);

const correctEncoding = new URLSearchParams({ text: value });

// Logs 'text=hello%26world'
console.log(correctEncoding.toString());

// URLSearchParams を body に直接使う
async function isPositive(text) {
  const response = await fetch(`http://text-processing.com/api/sentiment/`, {
    method: "POST",
    body: new URLSearchParams({ text }),
  });
  const json = await response.json();
  return json.label === "pos";
}
// URLSearchParams を body に使うと、Content-Type: application/x-www-form-urlencoded に自動的になる

/* FormData */
const formData = new FormData();
formData.set("foo", "bar");
formData.set("hello", "world");

const request = new Request("", { method: "POST", body: formData });
console.log(await request.text());
