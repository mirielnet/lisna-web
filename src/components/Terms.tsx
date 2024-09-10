import { createResource } from "solid-js";

function Terms() {
  const [termsText] = createResource(async () => {
    const response = await fetch("/terms.txt");
    return response.text();
  });

  return (
    <div>
      <h1>Terms of Service</h1>
      {termsText.loading && <p>Loading...</p>}
      <pre>{termsText()}</pre>
    </div>
  );
}

export default Terms;
