// Load Universe Hub all data by fetch api
const loadUniversHub = async (seeMore) => {
  try {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    showUniversHub(data.data.tools, seeMore);
  } catch (error) {
    console.log(error);
  }
};

// Display Universe Hub all data
const showUniversHub = (datas, seeMore) => {
  const elements = document.getElementById("elements");
  elements.innerHTML = "";

  //  first time display  6 data
  const seeMoreBtn = document.getElementById("see-more-btn");
  if (seeMore && datas.length > 6) {
    datas = datas.slice(0, 6);
    seeMoreBtn.classList.remove("d-none");
  } else {
    seeMoreBtn.classList.add("d-none");
  }

  datas.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 p-3 rounded-3">
              <img src="${
                data.image
              }" class="card-img-top rounded-2" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Feature</h5>
                <p class="card-text">1. ${
                  data.features[0] ? data.features[0] : "Not found"
                } </p>
                <p class="card-text">2. ${
                  data.features[1] ? data.features[1] : "Not found"
                } </p>
                <p class="card-text">3. ${
                  data.features[2] ? data.features[2] : "Not found"
                } </p>
              </div>
              <hr>
              <div class="d-flex justify-content-between">
              <div class="ms-2">
              <h5 class="card-title">${data.name}</h5>
              <div class="d-flex align-items-center">
              <i class="fa-regular fa-calendar-days"></i>
              <p class="ps-2 pt-3">${data.published_in}</p>
              </div>
              </div>
              <div class="mt-4 me-2 ">
              <i onclick="loadUniversHubDetails('${
                data.id
              }')" class="fa-solid fa-arrow-right bg-danger p-2 text-white rounded-5" data-bs-toggle="modal" data-bs-target="#UniverseHubModal"></i>
              </div>
              </div>
            </div>
  `;

    elements.appendChild(div);
  });

  // sorting by date
  const sorting = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA > dateB) {
      return 1;
    } else if (dateA < dateB) {
      return -1;
    } else {
      return 0;
    }
  };

  // sorting onclick handler
  document
    .getElementById("sorting-date")
    .addEventListener("click", function () {
      showUniversHub(datas.sort(sorting));
    });

  //  function for see more button
  let progress = (seeMore) => {
    loadUniversHub(seeMore);
  };

  //   see more btn click handler
  document
    .getElementById("see-more-btn")
    .addEventListener("click", function () {
      progress();
    });

  //   stop loading spinner
  const loadingSpinner = document.getElementById("spin-loader");
  loadingSpinner.classList.add("d-none");
};

// Load Universe Hub Specific id to open modal
const loadUniversHubDetails = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  showUniversHubDetails(data);
};

// Show Universe Hub Specific id to open details
const showUniversHubDetails = (detail) => {
  console.log(detail);
  const modalDiv = document.getElementById("modal-div");

  modalDiv.innerHTML = `
  
      <div class="col-md-6 mb-3 mb-sm-0">
                    <div class="card bg-danger-subtle ">
                      <div class="card-body">
                        <h4 class="card-title">${
                          detail.data.description
                            ? detail.data.description
                            : "Not Found"
                        }</h4>
                        <div
                          class="d-flex justify-content-between align-items-center my-4"
                        >
                          <div
                            class="p-3 bg-light-subtle rounded-3 text-success fw-semibold"
                          >
                          ${
                            detail.data.pricing
                              ? detail.data.pricing[0].price
                              : "Free of cost"
                          }
                            <br /> ${
                              detail.data.pricing
                                ? detail.data.pricing[0].plan
                                : "Basic"
                            } <br>
                          </div>
                          <div
                            class="mx-3 p-3 bg-light-subtle rounded-3 text-warning"
                          >
                          ${
                            detail.data.pricing
                              ? detail.data.pricing[1]
                                ? detail.data.pricing[1].price
                                : "Free of cost"
                              : "Free of cost"
                          }<br />
                          ${
                            detail.data.pricing
                              ? detail.data.pricing[1].plan
                              : "Pro"
                          } <br />
                          </div>
                          <div
                            class="p-3 bg-light-subtle rounded-3 text-danger fw-semibold"
                          >
                          ${
                            detail.data.pricing
                              ? detail.data.pricing[2].price
                              : "Free of cost"
                          }<br />
                          ${
                            detail.data.pricing
                              ? detail.data.pricing[3]
                                ? detail.data.pricing[3].plan
                                : "Enterprise"
                              : "Enterprise"
                          } <br />
                          </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center my-4 mx-3">
                          <div>
                            <h4>Features</h4>
                            <ul>
                              <li>${
                                detail.data.features
                                  ? detail.data.features["1"].feature_name
                                  : "Data not found"
                              }</li>
                              <li>${
                                detail.data.features
                                  ? detail.data.features["2"].feature_name
                                  : "Data not found"
                              }</li>
                              <li>${
                                detail.data.features
                                  ? detail.data.features["3"].feature_name
                                  : "Data not found"
                              }</li>
                            </ul>
                          </div>
                          <div>
                            <h4>Integrations</h4>
                            <ul>
                              <li>${
                                detail.data.integrations
                                  ? detail.data.integrations[0]
                                    ? detail.data.integrations[0]
                                    : "Data not found"
                                  : "Data not found"
                              }</li>
                              <li>${
                                detail.data.integrations
                                  ? detail.data.integrations[1]
                                    ? detail.data.integrations[1]
                                    : "Data not found"
                                  : "Data not found"
                              }</li>
                              <li>${
                                detail.data.integrations
                                  ? detail.data.integrations[2]
                                    ? detail.data.integrations[2]
                                    : "Data not found"
                                  : "Data not found"
                              }</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 ">
                    <div class="card">
                      <div class="card-body">
                        <div class="img-container">
                        <img
                          src="${
                            detail.data.image_link
                              ? detail.data.image_link[0]
                              : "Not found Image"
                          }"
                          class="card-img-top rounded-2 "
                          alt="..."
                        />
                        <h6 class="bg-danger accuracy-text ${
                          detail.data.accuracy.score ? "d-block" : "d-none"
                        }">${detail.data.accuracy.score * 100}% accuracy</h6>
                        </div>
                        <h5 class="card-title text-center my-3">${
                          detail.data.input_output_examples
                            ? detail.data.input_output_examples[0].input
                            : "Can you give any example?"
                        }</h5>
                        <p class="card-text text-center">
                        ${
                          detail.data.input_output_examples
                            ? detail.data.input_output_examples[0].output
                            : "No! Not yet! Take a break!!!"
                        }
                        </p>
                      </div>
                    </div>
                  </div>
        </div> 

  `;
};

loadUniversHub("a");
