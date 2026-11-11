export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

//we create our class ApiError(exteds error means that our class receives everything what JS error class every feature)
//so it is ordinar error, which will have its own additional functions
//status:numb we say to TS that this class will have additional property which will be number (to know HTTP status: 401, 404, 500...)
/*
როცა ამ კლასს ახალი new ApiError(...) ინსტანციით ვქმნით, კონსტრუქტორი იღებს ორ რამეს: შეტყობინებას (message) და სტატუს კოდს (status).

super(message); — იძახებს მშობელი (Error) კლასის კონსტრუქტორს და გადასცემს შეტყობინებას, რომ სტანდარტულმა მექანიზმმაც იცოდეს რა ერორია.

this.name = "ApiError"; — სტანდარტულად JavaScript-ის შეცდომებს აქვთ სახელი "Error". ჩვენ მას ვცვლით და ვწერთ "ApiError"-ს, რომ კონსოლში გამოტანისას ზუსტად ვხედავდეთ, რომელი კლასის შეცდომაა.

this.status = status; — გადაცემულ სტატუს კოდს (მაგალითად 404-ს) ვინახავთ ობიექტის შიგნით, რომ მერე კოდში მარტივად ვთქვათ: if (error.status === 404).
throw new ApiError("Product not found", 404);
catch (error) {
  if (error instanceof ApiError && error.status === 404) {
    // აი აქ ზუსტად ვიცით, რომ 404 ერორია და შეგვიძლია ლამაზი 404 გვერდი ვაჩვენოთ!
  }
}
*/