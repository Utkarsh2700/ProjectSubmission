import React from "react";

function SearchPage() {
  const [firstName, setFirstName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  function handleSubmit() {
    if (firstName.length < 2) {
      alert("First name should be atleast 2 characters long!");
      return;
    }
    if (phoneNumber.length !== 10) {
      alert("Mobile Number must be 10 characters long!");
    } else {
      // API Call(POST) to backend for saving the data in database
      console.log({ firstName, phoneNumber });
      setFirstName("");
      setPhoneNumber("");
      alert("Form submitted successfully!");
    }
  }
  return (
    <div className="flex flex-col justify-evenly h-screen w-full items-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% py-4">
      <SearchBar />
      <form
        className="flex flex-col space-y-6"
        action="/search"
        method="post"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          className="text-xl md:text-2xl md:font-semibold"
          htmlFor="firstname"
        >
          First name:
        </label>
        <input
          className="border-2 border-gray-800 rounded-md px-3 py-1 outline-0"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstname"
          id="firstname"
          placeholder="Enter your first name"
          required
        />
        <label
          className="text-xl md:text-2xl md:font-semibold"
          htmlFor="phoneNumber"
        >
          Mobile Number:
        </label>
        <input
          className="border-2 border-gray-800 rounded-md px-3 py-1 outline-0"
          type="tel"
          value={phoneNumber}
          name="phoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required={true}
          pattern="[0-9]{10}"
          id="phoneNumber"
          placeholder="Enter 10 digit mobile number"
        />
        <button
          className="cursor-pointer bg-blue-500 text-white px-2 py-1.5 rounded-md hover:bg-blue-600"
          type="submit"
          onClick={handleSubmit}
        >
          Submit Details
        </button>
      </form>
    </div>
  );
}

function SearchBar() {
  const [searchText, setSearchText] = React.useState("");
  const [searchTextDeb, setSearchTextDeb] = React.useState("");
  // holding the search values for debouncing
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTextDeb(searchText);
      //   API Call(GET) to fetch data based on searchTextDeb if we want to fetch data on every keystroke(at a delay of 400ms)
      //   console.log({ searchTextDeb });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  function handleSearch() {
    // API Call(GET) to fetch data based on searchText
    console.log("Searching for: ", searchText);
  }

  return (
    <div className="flex justify-center items-center space-x-4">
      <input
        type="text"
        className="border-2 border-gray-800 rounded-md px-3 py-1 outline-0"
        placeholder="Search for anything"
        onChange={handleSearchChange}
        value={searchText}
      />
      <button
        className="bg-blue-500 text-white px-2 py-1.5 rounded-md hover:bg-blue-600 cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchPage;
