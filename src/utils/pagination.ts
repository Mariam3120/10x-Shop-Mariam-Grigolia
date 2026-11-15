//page: current page on which is user now, totalPages - in total how many
//the function returns an array which can be number or ...
export function getPageNumbers(
  page: number,
  totalPages: number,
): (number | "...")[] {
  const pages: (number | "...")[] = []; //create empty array

  for (let p = 1; p <= totalPages; p++) {
    //call cycle from page 1 till last page
    const isEdge = p === 1 || p === totalPages; //is page first or last? edges must be seen always for user
    const isNear = Math.abs(p - page) <= 1; //isNear (ახლომდებარეები): არის თუ არა ეს გვერდი მიმდინარე page-თან ახლოს? Math.abs(p - page) <= 1 ნიშნავს, რომ ვამოწმებთ მიმდინარე გვერდის წინა და მომდევნო გვერდებს (მაგალითად, თუ მიმდინარე არის 5, ახლოსაა 4 და 6).  2-5-=3 <=1? არა p არის ის მიმდინარე გვერდი, რომელსაც ციკლი ამ წუთას ათვალიერებს, ხოლო page არის ის გვერდი, რომელზეც შენ (იუზერი) რეალურად იმყოფები (მაგალითად, მე-5 გვერდი). Math.abs -1 ს გადააქცევს 1ად

    if (isEdge || isNear) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
    /*
    თუ გვერდი კიდეა ან ახლოსაა (მაგალითად, მიმდინარე 5-ია და ვამოწმებთ 4-ს, 5-ს ან 6-ს): მასივში ვამატებთ ამ ციფრს (pages.push(p)).

სხვა შემთხვევაში (else if): თუ გვერდი შორსაა (არც კიდეა და არც მიმდინარე გვერდის გვერდია), იქ წერტილები ("...") უნდა ჩაისვას.
if (pages[pages.length - 1] !== "...") — ანუ, „თუ მასივის ბოლო ელემენტი უკვე წერტილი არ არის, მხოლოდ მაშინ ჩაამატე ახალი წერტილი“.
    */
  }

  return pages;
}
