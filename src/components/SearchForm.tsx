import { HighlighterParams } from "../lib/components/Highlighted";

interface SearchFormProps {
  onSubmit: ({ target, options }: HighlighterParams) => void;
  defaultTarget: string;
}

/**
 * GUI for user to be able to tweak search data
 */
export const SearchForm = ({ onSubmit, defaultTarget }: SearchFormProps) => {
  const setFormData = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      target: { value: string };
      isWordMatched: { checked: boolean };
      isCaseMatched: { checked: boolean };
      isRegex: { checked: boolean };
    };
    const options = {
      isWordMatched: form.isWordMatched.checked,
      isCaseMatched: form.isCaseMatched.checked,
      isRegex: form.isRegex.checked,
    };
    const target = form.target.value;
    onSubmit({ target, options });
  };
  return (
    <form onSubmit={setFormData} style={{ marginBottom: "0.4em" }}>
      <div className="search-input">
        <input
          name="target"
          id="target"
          type={"text"}
          defaultValue={defaultTarget}
        />
        <button name={"submit"} id={"submit"} type={"submit"}>
          search
        </button>
      </div>
      <fieldset>
        <legend>Options:</legend>
        <div>
          <input type="checkbox" id="isWordMatched" name="isWordMatched" />
          <label htmlFor="isWordMatched">Match whole word</label>
        </div>

        <div>
          <input type="checkbox" id="isCaseMatched" name="isCaseMatched" />
          <label htmlFor="isCaseMatched">Match case</label>
        </div>
        <div>
          <input type="checkbox" id="isRegex" name="isRegex" />
          <label htmlFor="isRegex">Use regular expression</label>
        </div>
      </fieldset>
    </form>
  );
};
