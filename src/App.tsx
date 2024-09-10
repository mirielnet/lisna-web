import { createSignal, onMount } from "solid-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import showdown from "showdown";

interface Command {
  name: string;
  description: string;
}

const App = () => {
  const [commands, setCommands] = createSignal<Command[]>([]);
  const [error, setError] = createSignal<string | null>(null);
  const [infoContent, setInfoContent] = createSignal<string>("");

  // Markdownファイルの読み込み
  const fetchInfo = async () => {
    try {
      const response = await fetch("/info.md");
      const text = await response.text();
      const converter = new showdown.Converter();
      const html = converter.makeHtml(text);
      setInfoContent(html);
    } catch (err) {
      setInfoContent("<p>お知らせ情報を取得できませんでした。</p>");
    }
  };

  onMount(() => {
    fetchInfo();
    fetch("https://lisna.jp/api/commands")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.commands)) {
          setCommands(data.commands);
        } else {
          setError("コマンド情報の形式が正しくありません。");
        }
      })
      .catch(() => {
        setError("コマンド情報の取得に失敗しました。");
      });
  });

  return (
    <div>
      <style>{`
        body {
          background-color: #1c1c1c;
          color: #fff;
          font-family: 'Arial', sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #2b2b2b;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
        }
        .logo img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        nav a {
          color: #ff69b4;
          text-decoration: none;
          font-weight: bold;
          margin-right: 20px;
        }
        nav a:last-child {
          margin-right: 0;
        }
        nav a:hover {
          text-decoration: underline;
        }
        .description {
          margin-top: 120px;
        }
        h1 {
          font-size: 3em;
          color: #ff69b4;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 1.8em;
          color: #ff69b4;
        }
        .command-item {
          background: #2b2b2b;
          border-radius: 10px;
          padding: 15px;
          margin: 10px 0;
          font-size: 1.1em;
          color: #ff69b4;
          transition: all 0.3s ease;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        .command-item:hover {
          background: #333;
        }
        footer {
          margin-top: 50px;
          padding: 20px;
          font-size: 0.9em;
          background: #ff69b4;
          color: white;
          border-radius: 10px;
        }
        .info-section {
          background-color: #2b2b2b;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        .info-section h3 {
          color: #ff69b4;
          font-size: 2em;
        }
        .info-content {
          font-size: 1.2em;
          color: #ffffff;
        }
      `}</style>

      <header class="header">
        <div class="logo">
          <img src="https://cdn.discordapp.com/avatars/1262605965296013363/e4464e591848e6f8eae1e432583f66d5.png?size=512" alt="Lisna Icon" />
          <span>Lisna</span>
        </div>
        <nav>
          <a href="#about">About</a>
          <a href="#commands">Commands</a>
          <a href="https://lisna.jp/invite" target="_blank" rel="noopener noreferrer">Invite</a>
        </nav>
      </header>

      <div class="container">
        <section class="description">
          <h1>Lisna</h1>
          <h2>Miriel (@miriel.net) 開発の OSS Discord ボット</h2>
          <p>Lisnaは、さまざまな機能を提供しています。</p>
          <p>さらに、他のBOTにはあまり見られない、MIQ機能、パッケージ検索機能、AI機能、高機能な翻訳機能、クロネコヤマト追跡機能を搭載しています！</p>
          <h6>※1 Powered By npm or PyPi</h6>
          <h6>※2 Powered By GPT-4 by OpenAi</h6>
          <h6>※3 Powered By DeepL</h6>
          <h6>※4 クロネコヤマトはヤマトホールディングス株式会社の登録商標です。</h6>
        </section>

        <section class="info-section" style="margin-top: 50px;">
          <h3>Information</h3>
          <div class="info-content" innerHTML={infoContent()} />
        </section>

        <h3 id="commands">Commands</h3>
        <div class="accordion" id="commandsAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCommands">
                コマンド一覧を表示
              </button>
            </h2>
            <div id="collapseCommands" class="accordion-collapse collapse">
              <div class="accordion-body">
                {error() ? (
                  <div class="command-item">{error()}</div>
                ) : (
                  commands().map((command) => (
                    <div class="command-item">{`${command.name} - ${command.description}`}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <p>機能提案やPR(貢献)など大歓迎です。GitHubは<a href="https://github.com/mirielnet/lisna" target="_blank" rel="noopener noreferrer">こちら</a></p>
        <p>サーバー導入は<a href="https://lisna.jp/invite" target="_blank" rel="noopener noreferrer">こちらから</a></p>
      </div>

      <footer>
        Copyright © 2024 Lisna All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
