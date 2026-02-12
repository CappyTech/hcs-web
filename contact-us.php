<?php
	include 'php/main/head-start.php';
?>
<title>Home - Heron Constructive Solutions</title>
<?php
  	include 'php/main/google-analytics.php';
?>
<?php
	include 'php/main/head-end.php';
?>
<?php
  	include 'php/main/google-recaptcha.php';
?>
<?php
	include 'php/main/body-navigation.php';
?>

<!-- Main Content --> 
<div class="container my-5">

 
    <!--Section: Content-->
    <section class="contact-section dark-grey-text mb-5">
      
      <style>
      	.contact-section .form .btn-floating {
          left: 3px;
        }
      </style>

      <!-- Form with header -->
      <div class="card">

        <!-- Grid row -->
        <div class="row">

          <!-- Grid column -->
          <div class="col-lg-8">

            <div class="card-body form">

              <!-- Header -->
              <h3 class="font-weight-bold dark-grey-text mt-4"><i class="fas fa-envelope pr-2 mr-1"></i>Write to us:</h3>

              <!-- Grid row -->
              <div class="row">

                <!-- Grid column -->
                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <input type="text" id="form-contact-name" class="form-control">
                    <label for="form-contact-name" class="">Your name <span class="hcs-red-text">*</span></label>
                  </div>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <input type="text" id="form-contact-email" class="form-control">
                    <label for="form-contact-email" class="">Your email <span class="hcs-red-text">*</span></label>
                  </div>
                </div>
                <!-- Grid column -->

              </div>
              <!-- Grid row -->

              <!-- Grid row -->
              <div class="row">

                <!-- Grid column -->
                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <input type="text" id="form-contact-phone" class="form-control">
                    <label for="form-contact-phone" class="">Your phone</label>
                  </div>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <input type="text" id="form-contact-company" class="form-control">
                    <label for="form-contact-company" class="">Your company</label>
                  </div>
                </div>
                <!-- Grid column -->

              </div>
              <!-- Grid row -->

              <!-- Grid row -->
              <div class="row">

                <!-- Grid column -->
                <div class="col-md-12">
                  <div class="md-form mb-0">
                    <textarea id="form-contact-message" class="form-control md-textarea" rows="5"></textarea>
                    <label for="form-contact-message">Your message <span class="hcs-red-text">*</span></label>
                    <a class="btn-floating btn-lg hcs-red">
                      <i class="far fa-paper-plane"></i>
                    </a>
                  </div>
                </div>
                <!-- Grid column -->

              </div>
              <!-- Grid row -->

            </div>

          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-lg-4">

            <div class="card-body contact text-center h-100 white-text">

              <h3 class="font-weight-bold my-4 pb-2">Contact Information</h3>
              <ul class="text-lg-left list-unstyled ml-4">
                <li>
                  <p><i class="fas fa-map-marker-alt pr-2"></i>Liverpool, L18 1JZ, United Kingdom</p>
                </li>
                <li>
                  <p><i class="fas fa-phone pr-2"></i>(+44) 0151 475 1217</p>
                </li>
                <li>
                  <p><i class="fas fa-envelope pr-2"></i>admin@heroncs.co.uk</p>
                </li>
              </ul>
              <hr class="hr-light my-4">
              <ul class="text-lg-left list-unstyled ml-4">
                <li>
                  <p><i class="fas fa-map-marker-alt pr-2"></i>Chester, WA4 4AZ, United Kingdom</p>
                </li>
                <li>
                  <p><i class="fas fa-phone pr-2"></i>(+44) 01928 333 212</p>
                </li>
                <li>
                  <p><i class="fas fa-envelope pr-2"></i>admin@heroncs.co.uk</p>
                </li>
              </ul>
              <hr class="hr-light my-4">
              <ul class="list-inline text-center list-unstyled">
                <li class="list-inline-item">
                  <a class="p-2 fa-lg tw-ic">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="p-2 fa-lg li-ic">
                    <i class="fab fa-linkedin-in"> </i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="p-2 fa-lg ins-ic">
                    <i class="fab fa-facebook"> </i>
                  </a>
                </li>
              </ul>

            </div>

          </div>
          <!-- Grid column -->

        </div>
        <!-- Grid row -->

      </div>
      <!-- Form with header -->

    </section>
    <!--Section: Content-->


  </div>

<?php
	include 'php/main/footer-end.php';
?>