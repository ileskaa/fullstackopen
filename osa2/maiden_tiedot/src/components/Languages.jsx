const Languages = ({ languages }) => {
  const languageListItems = Object.values(languages).map((language) => (
    <li key={language}>{language}</li>
  ));
  return <ul>{languageListItems}</ul>;
};

export default Languages;
