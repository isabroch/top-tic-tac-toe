const Player = (name, mark) => {
  function setName(value) {
    name = value;
    return name;
  }

  function setMark(value) {
    mark = value;
    return mark;
  }

  function getName() {
    return name;
  }

  function getMark() {
    return mark;
  }

  return {
    setName,
    setMark,
    getName,
    getMark,
  };
};

export default Player;