describe("Contacts", () => {
  it("FB icon, opens in a new tab", () => {
    cy.visitHome();
    cy.get(".icon-facebook").closest("a")
      .should("have.attr", "href", "https://www.facebook.com/Hillel.IT.School")
      .and("have.attr", "target", "_blank");
  });
  it("Telegram icon, opens in a new tab", () => {
    cy.visitHome();
    cy.get(".icon-telegram").closest("a")
      .should("have.attr", "href", "https://t.me/ithillel_kyiv")
      .and("have.attr", "target", "_blank");
  });
  it("Youtube icon, opens in a new tab", () => {
    cy.visitHome();
    cy.get(".icon-youtube").closest("a")
      .should("have.attr", "href")
      .and("include", "https://www.youtube.com/user/HillelITSchool");
    cy.get(".icon-youtube").closest("a")
      .should("have.attr", "target", "_blank");
  });
  it("Instagram icon, opens in a new tab", () => {
    cy.visitHome();
    cy.get(".icon-instagram").closest("a")
      .should("have.attr", "href", "https://www.instagram.com/hillel_itschool/")
      .and("have.attr", "target", "_blank");
  });

  it("Linkedin icon, opens in a new tab", () => {
    cy.visitHome();
    cy.get(".icon-linkedin").closest("a")
      .should("have.attr", "href", "https://www.linkedin.com/school/ithillel/")
      .and("have.attr", "target", "_blank");
  });
  it("ithillel.ua open link", () => {
    cy.visitHome();
    cy.get("a[href=\"https://ithillel.ua\"]").click();
    cy.get("a[href*=\"ithillel.ua\"]")
      .should("have.attr", "href", "https://ithillel.ua");
  });
  it("support open link", () => {
    cy.visitHome();
    cy.get("a[href=\"mailto:developer@ithillel.ua\"]")
      .should("have.attr", "href", "mailto:developer@ithillel.ua")
      .and("have.text", "support@ithillel.ua");
  });
});
