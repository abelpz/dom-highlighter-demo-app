/**
 * A stateless component containing only jsx
 */
export function Content() {
  return (
    <>
      <Editable>
        <h2 id="sometimes-you-need-text-to-be-highlighted">
          Sometimes you need text to be highlighted
        </h2>
      </Editable>
      <div style={{ fontSize: "1em" }}>
        <Editable>
          <br />
          <p>
            And then, on the web, you often need{" "}
            <u>
              <em>«text</em>
            </u>{" "}
            to{" "}
            <strong>
              <em>be</em>
            </strong>{" "}
            <em>highlighted</em> within mixed» and/or nested HTML tags/markup,
            like when you implement a search feature in your app.
            It's&nbsp;pretty easy to find implementations that can partially
            highlight text in HTML.
          </p>
        </Editable>
        <Editable>
          <p>
            But it's «surprisingly hard» to find one that deals with the
            scenario where the text{" "}
            <em>
              to be <u>highlighted</u>
            </em>{" "}
            is spanning «across multiple diverse» HTML tags (think rich-text
            formatting)
          </p>
          <p>
            <u style={{ marginRight: "0.5em" }}>
              <em>Example:</em>
            </u>{" "}
            <span>
              <u>text</u> to <b>be</b>{" "}
              <u>
                high<em>lighted</em>
              </u>
            </span>
          </p>
        </Editable>
        <Editable>
          <div>
            <summary>
              <h3>So how do we solve this?</h3>
            </summary>
            <p>
              In order for text to be highlighted across multiple HTML elements,
              we can use a very simple <em>state machine</em>: the basic idea is
              that we loop character by character over the
              <code>TextNodes</code> within a given root until we eventually
              find the pattern corresponding to the text to be highlighted
            </p>

            <p>
              The point of this notebook is to show you a way to solve this
              problem (highlighting HTML text) using JavaScript and show you a
              few tricks along the way!
            </p>
          </div>
        </Editable>

        <div>
          <Editable>
            <summary>
              <h3>A word of caution</h3>
            </summary>
            <p>
              There is a reason why so little existing solutions deal with this
              case: the state machine is probably slower compared to other
              methods that rely on native highly optimized code to search for
              text to be highlighted, and there's a chance we're trading speed
              for precision.
            </p>
            <p>
              With that being said, what really takes time when searching and
              highlighting text, is the highlighting part, and to be even more
              specific, the unhighlighting part is very costly. Since, for the
              text to be highlighted, we are modifying the DOM, the browser has
              to do a lot of layout work and this is always «expensive».
            </p>
            <p>
              No matter what, there is nothing more frustrating than seeing a
              match not being highlighted when others are, it just feels broken,
              and no mitigation will ever completely overcome this.
            </p>
          </Editable>
        </div>
      </div>
    </>
  );
}

function Editable({ ...props }) {
  return (
    <div
      {...props}
      suppressContentEditableWarning={true}
      contentEditable={true}
    />
  );
}
