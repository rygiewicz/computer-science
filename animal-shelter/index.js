function Dog() {

}

function Cat() {

}

function AnimalShelter() {
  this.animals = new LinkedList();
}

AnimalShelter.prototype.add = function (animal) {
  this.animals.add(animal);
}

AnimalShelter.prototype.getAny = function () {
  if (!this.animals.head) {
    return;
  }

  const animalData = this.animals.head.data;
  this.animals.head = this.animals.head.next;

  return animalData;
}

AnimalShelter.prototype.getCat = function () {
  return this.getAnimal(Cat);
}

AnimalShelter.prototype.getDog = function () {
  return this.getAnimal(Dog);
}

AnimalShelter.prototype.getAnimal = function (Class) {
  if (!this.animals.head) {
    return;
  }

  let previous = null;
  let current = this.animals.head;

  while (current) {
    const animalData = current.data;

    if (animalData instanceof Class) {
      if (!previous) {
        this.animals.head = this.animals.head.next;
      } else {
        previous.next = current.next;
      }

      return animalData;
    }

    previous = current;
    current = current.next;
  }
}

test();

function test() {
  shouldGetAny();
  shouldGetDog();
  shouldGetCat();
}

function shouldGetAny() {
  const shelter = new AnimalShelter();

  const dog1 = new Dog();
  const dog2 = new Dog();
  const cat1 = new Cat();

  shelter.add(dog1);
  shelter.add(dog2);
  shelter.add(cat1);

  if (shelter.getAny() !== dog1 || shelter.getAny() !== dog2 || shelter.getAny() !== cat1) {
    throw new Error('shouldGetAny');
  }

  console.log('OK');
}

function shouldGetDog() {
  const shelter = new AnimalShelter();

  const dog1 = new Dog();
  const dog2 = new Dog();
  const cat1 = new Cat();

  shelter.add(dog1);
  shelter.add(dog2);
  shelter.add(cat1);

  if (shelter.getDog() !== dog1 || shelter.getDog() !== dog2 || shelter.getAny() !== cat1) {
    throw new Error('shouldGetDog');
  }

  console.log('OK');
}

function shouldGetCat() {
  const shelter = new AnimalShelter();

  const dog1 = new Dog();
  const dog2 = new Dog();
  const dog3 = new Dog();
  const cat1 = new Cat();
  const cat2 = new Cat();
  const cat3 = new Cat();

  shelter.add(cat1);
  shelter.add(dog1);
  shelter.add(dog2);
  shelter.add(cat2);
  shelter.add(dog3);
  shelter.add(cat3);


  if (shelter.getCat() !== cat1 || shelter.getCat() !== cat2 || shelter.getCat() !== cat3) {
    throw new Error('shouldGetCat');
  }

  console.log('OK');
}