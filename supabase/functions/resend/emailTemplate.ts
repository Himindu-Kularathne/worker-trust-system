export function workerRequestTemplate(worker: any) {
  const approveUrl =
    `https://xuqsbheuxtthgyosmxrh.supabase.co/functions/v1/approve-worker` + `?request_id=${worker.id}`;
  return `<!--
* This email was built using Tabular.
* For more information, visit https://tabular.email
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!--[if !mso]>-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <style type="text/css">
      table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      table td {
        border-collapse: collapse;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      body,
      a,
      li,
      p,
      h1,
      h2,
      h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      html {
        -webkit-text-size-adjust: none !important;
      }
      body {
        min-width: 100%;
        margin: 0px;
        padding: 0px;
      }
      body,
      #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      #innerTable img + div {
        display: none;
        display: none !important;
      }
      img {
        margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic;
      }
      h1,
      h2,
      h3,
      p,
      a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word;
      }
      a {
        text-decoration: none;
      }
      h1,
      h2,
      h3,
      p {
        min-width: 100% !important;
        width: 100% !important;
        max-width: 100% !important;
        display: inline-block !important;
        border: 0;
        padding: 0;
        margin: 0;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
      a[href^="mailto"],
      a[href^="tel"],
      a[href^="sms"] {
        color: inherit;
        text-decoration: none;
      }
    </style>
    <style type="text/css">
      @media (min-width: 481px) {
        .hd {
          display: none !important;
        }
      }
    </style>
    <style type="text/css">
      @media (max-width: 480px) {
        .hm {
          display: none !important;
        }
      }
    </style>
    <style type="text/css">
      @media (max-width: 480px) {
        .t72,
        .t87,
        .t90 {
          text-align: center !important;
        }
        .t69,
        .t87,
        .t88 {
          display: block !important;
        }
        .t107 {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }
        .t69 {
          mso-line-height-alt: 14px !important;
          line-height: 14px !important;
        }
        .t67 {
          display: revert !important;
        }
        .t70,
        .t86 {
          vertical-align: middle !important;
          display: inline-block !important;
          width: 100% !important;
        }
        .t70 {
          max-width: 98px !important;
        }
        .t86 {
          max-width: 800px !important;
        }
      }
    </style>
    <!--[if !mso]>-->
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&amp;family=Roboto:wght@400;700&amp;display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
    <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
  </head>
  <body id="body" class="t113" style="min-width: 100%; margin: 0px; padding: 0px; background-color: #fafafa">
    <div class="t112" style="background-color: #fafafa">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
          <td
            class="t111"
            style="font-size: 0; line-height: 0; mso-line-height-rule: exactly; background-color: #fafafa"
            valign="top"
            align="center"
          >
            <!--[if mso]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                <v:fill color="#FAFAFA" />
              </v:background>
            <![endif]-->
            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              id="innerTable"
            >
              <tr>
                <td align="center">
                  <table
                    class="t110"
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    style="margin-left: auto; margin-right: auto"
                  >
                    <tr>
                      <td width="630" class="t109" style="width: 630px">
                        <table
                          class="t108"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="width: 100%"
                        >
                          <tr>
                            <td class="t107" style="background-color: #ffffff; padding: 40px 60px 40px 60px">
                              <table
                                role="presentation"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 100% !important"
                              >
                                <tr>
                                  <td align="left">
                                    <table
                                      class="t4"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-right: auto"
                                    >
                                      <tr>
                                        <td width="40" class="t3" style="width: 40px">
                                          <table
                                            class="t2"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t1">
                                                <div style="font-size: 0px">
                                                  <img
                                                    class="t0"
                                                    style="
                                                      display: block;
                                                      border: 0;
                                                      height: auto;
                                                      width: 100%;
                                                      margin: 0;
                                                      max-width: 100%;
                                                    "
                                                    width="40"
                                                    height="39.34426229508197"
                                                    alt=""
                                                    src="https://6cde0f6d-76e4-4053-8a61-d9ef9d0cd5c7.b-cdn.net/e/bb104a26-f66f-4d8f-9152-355fa0c66027/97843074-ab45-4273-8e3c-9c7bae3fe8f6.png"
                                                  />
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t5"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 40px;
                                        line-height: 40px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t10"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-left: auto; margin-right: auto"
                                    >
                                      <tr>
                                        <td width="510" class="t9" style="width: 744px">
                                          <table
                                            class="t8"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t7">
                                                <h1
                                                  class="t6"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family: Poppins, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
                                                      Arial, sans-serif;
                                                    line-height: 34px;
                                                    font-weight: 700;
                                                    font-style: normal;
                                                    font-size: 29px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #333333;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 2px;
                                                  "
                                                >
                                                  A New Worker Registration Request Was Submitted
                                                </h1>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t11"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 11px;
                                        line-height: 11px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t16"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-left: auto; margin-right: auto"
                                    >
                                      <tr>
                                        <td class="t15">
                                          <table
                                            class="t14"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t13">
                                                <p
                                                  class="t12"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family: Poppins, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
                                                      Arial, sans-serif;
                                                    line-height: 22px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    font-size: 16px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #333333;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 2px;
                                                  "
                                                >
                                                  Please review the details below and make changes through the admin
                                                  panel.
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t17"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 4px;
                                        line-height: 4px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t64"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-left: auto; margin-right: auto"
                                    >
                                      <tr>
                                        <td width="510" class="t63" style="width: 800px">
                                          <table
                                            class="t62"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t61" style="padding: 30px 0 10px 0">
                                                <table
                                                  role="presentation"
                                                  width="100%"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  style="width: 100% !important"
                                                >
                                                  <tr>
                                                    <td align="center">
                                                      <table
                                                        class="t27"
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        style="margin-left: auto; margin-right: auto"
                                                      >
                                                        <tr>
                                                          <td width="510" class="t26" style="width: 800px">
                                                            <table
                                                              class="t25"
                                                              role="presentation"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              width="100%"
                                                              style="width: 100%"
                                                            >
                                                              <tr>
                                                                <td
                                                                  class="t24"
                                                                  style="
                                                                    border: 1px solid #e3e3e3;
                                                                    overflow: hidden;
                                                                    padding: 30px 30px 30px 30px;
                                                                    border-radius: 6px 6px 0 0;
                                                                  "
                                                                >
                                                                  <table
                                                                    role="presentation"
                                                                    width="100%"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    style="width: 100% !important"
                                                                  >
                                                                    <tr>
                                                                      <td align="center">
                                                                        <table
                                                                          class="t23"
                                                                          role="presentation"
                                                                          cellpadding="0"
                                                                          cellspacing="0"
                                                                          style="margin-left: auto; margin-right: auto"
                                                                        >
                                                                          <tr>
                                                                            <td
                                                                              width="448"
                                                                              class="t22"
                                                                              style="width: 600px"
                                                                            >
                                                                              <table
                                                                                class="t21"
                                                                                role="presentation"
                                                                                cellpadding="0"
                                                                                cellspacing="0"
                                                                                width="100%"
                                                                                style="width: 100%"
                                                                              >
                                                                                <tr>
                                                                                  <td class="t20">
                                                                                    <p
                                                                                      class="t19"
                                                                                      style="
                                                                                        margin: 0;
                                                                                        margin: 0;
                                                                                        font-family: Roboto,
                                                                                          BlinkMacSystemFont, Segoe UI,
                                                                                          Helvetica Neue, Arial,
                                                                                          sans-serif;
                                                                                        line-height: 22px;
                                                                                        font-weight: 400;
                                                                                        font-style: normal;
                                                                                        font-size: 16px;
                                                                                        text-decoration: none;
                                                                                        text-transform: none;
                                                                                        direction: ltr;
                                                                                        color: #333333;
                                                                                        text-align: left;
                                                                                        mso-line-height-rule: exactly;
                                                                                        mso-text-raise: 2px;
                                                                                      "
                                                                                    >
                                                                                      <span
                                                                                        class="t18"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          margin: 0;
                                                                                          font-weight: bold;
                                                                                          mso-line-height-rule: exactly;
                                                                                        "
                                                                                        >Request Details</span
                                                                                      >
                                                                                    </p>
                                                                                  </td>
                                                                                </tr>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center">
                                                      <table
                                                        class="t51"
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        style="margin-left: auto; margin-right: auto"
                                                      >
                                                        <tr>
                                                          <td width="510" class="t50" style="width: 800px">
                                                            <table
                                                              class="t49"
                                                              role="presentation"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              width="100%"
                                                              style="width: 100%"
                                                            >
                                                              <tr>
                                                                <td
                                                                  class="t48"
                                                                  style="
                                                                    border: 1px solid #e3e3e3;
                                                                    padding: 30px 30px 30px 30px;
                                                                  "
                                                                >
                                                                  <table
                                                                    role="presentation"
                                                                    width="100%"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    style="width: 100% !important"
                                                                  >
                                                                    <tr>
                                                                      <td align="center">
                                                                        <table
                                                                          class="t33"
                                                                          role="presentation"
                                                                          cellpadding="0"
                                                                          cellspacing="0"
                                                                          style="margin-left: auto; margin-right: auto"
                                                                        >
                                                                          <tr>
                                                                            <td
                                                                              width="448"
                                                                              class="t32"
                                                                              style="width: 600px"
                                                                            >
                                                                              <table
                                                                                class="t31"
                                                                                role="presentation"
                                                                                cellpadding="0"
                                                                                cellspacing="0"
                                                                                width="100%"
                                                                                style="width: 100%"
                                                                              >
                                                                                <tr>
                                                                                  <td class="t30">
                                                                                    <p
                                                                                      class="t29"
                                                                                      style="
                                                                                        margin: 0;
                                                                                        margin: 0;
                                                                                        font-family: Roboto,
                                                                                          BlinkMacSystemFont, Segoe UI,
                                                                                          Helvetica Neue, Arial,
                                                                                          sans-serif;
                                                                                        line-height: 22px;
                                                                                        font-weight: 400;
                                                                                        font-style: normal;
                                                                                        font-size: 16px;
                                                                                        text-decoration: none;
                                                                                        text-transform: none;
                                                                                        direction: ltr;
                                                                                        color: #333333;
                                                                                        text-align: left;
                                                                                        mso-line-height-rule: exactly;
                                                                                        mso-text-raise: 2px;
                                                                                      "
                                                                                    >
                                                                                      <span
                                                                                        class="t28"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          margin: 0;
                                                                                          font-weight: bold;
                                                                                          mso-line-height-rule: exactly;
                                                                                        "
                                                                                        >Name: </span
                                                                                      >${worker.full_name}
                                                                                    </p>
                                                                                  </td>
                                                                                </tr>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <div
                                                                          class="t36"
                                                                          style="
                                                                            mso-line-height-rule: exactly;
                                                                            mso-line-height-alt: 4px;
                                                                            line-height: 4px;
                                                                            font-size: 1px;
                                                                            display: block;
                                                                          "
                                                                        >
                                                                          &nbsp;&nbsp;
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td align="center">
                                                                        <table
                                                                          class="t40"
                                                                          role="presentation"
                                                                          cellpadding="0"
                                                                          cellspacing="0"
                                                                          style="margin-left: auto; margin-right: auto"
                                                                        >
                                                                          <tr>
                                                                            <td
                                                                              width="448"
                                                                              class="t39"
                                                                              style="width: 600px"
                                                                            >
                                                                              <table
                                                                                class="t38"
                                                                                role="presentation"
                                                                                cellpadding="0"
                                                                                cellspacing="0"
                                                                                width="100%"
                                                                                style="width: 100%"
                                                                              >
                                                                                <tr>
                                                                                  <td class="t37">
                                                                                    <p
                                                                                      class="t35"
                                                                                      style="
                                                                                        margin: 0;
                                                                                        margin: 0;
                                                                                        font-family: Roboto,
                                                                                          BlinkMacSystemFont, Segoe UI,
                                                                                          Helvetica Neue, Arial,
                                                                                          sans-serif;
                                                                                        line-height: 22px;
                                                                                        font-weight: 400;
                                                                                        font-style: normal;
                                                                                        font-size: 16px;
                                                                                        text-decoration: none;
                                                                                        text-transform: none;
                                                                                        direction: ltr;
                                                                                        color: #333333;
                                                                                        text-align: left;
                                                                                        mso-line-height-rule: exactly;
                                                                                        mso-text-raise: 2px;
                                                                                      "
                                                                                    >
                                                                                      <span
                                                                                        class="t34"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          margin: 0;
                                                                                          font-weight: bold;
                                                                                          mso-line-height-rule: exactly;
                                                                                        "
                                                                                        >Phone Number </span
                                                                                      >${worker.phone}
                                                                                    </p>
                                                                                  </td>
                                                                                </tr>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <div
                                                                          class="t43"
                                                                          style="
                                                                            mso-line-height-rule: exactly;
                                                                            mso-line-height-alt: 4px;
                                                                            line-height: 4px;
                                                                            font-size: 1px;
                                                                            display: block;
                                                                          "
                                                                        >
                                                                          &nbsp;&nbsp;
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td align="center">
                                                                        <table
                                                                          class="t47"
                                                                          role="presentation"
                                                                          cellpadding="0"
                                                                          cellspacing="0"
                                                                          style="margin-left: auto; margin-right: auto"
                                                                        >
                                                                          <tr>
                                                                            <td
                                                                              width="448"
                                                                              class="t46"
                                                                              style="width: 600px"
                                                                            >
                                                                              <table
                                                                                class="t45"
                                                                                role="presentation"
                                                                                cellpadding="0"
                                                                                cellspacing="0"
                                                                                width="100%"
                                                                                style="width: 100%"
                                                                              >
                                                                                <tr>
                                                                                  <td class="t44">
                                                                                    <p
                                                                                      class="t42"
                                                                                      style="
                                                                                        margin: 0;
                                                                                        margin: 0;
                                                                                        font-family: Roboto,
                                                                                          BlinkMacSystemFont, Segoe UI,
                                                                                          Helvetica Neue, Arial,
                                                                                          sans-serif;
                                                                                        line-height: 22px;
                                                                                        font-weight: 400;
                                                                                        font-style: normal;
                                                                                        font-size: 16px;
                                                                                        text-decoration: none;
                                                                                        text-transform: none;
                                                                                        direction: ltr;
                                                                                        color: #333333;
                                                                                        text-align: left;
                                                                                        mso-line-height-rule: exactly;
                                                                                        mso-text-raise: 2px;
                                                                                      "
                                                                                    >
                                                                                      <span
                                                                                        class="t41"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          margin: 0;
                                                                                          font-weight: bold;
                                                                                          mso-line-height-rule: exactly;
                                                                                        "
                                                                                        >Location: </span
                                                                                      >${worker.city}, ${worker.district}, ${worker.province}
                                                                                    </p>
                                                                                  </td>
                                                                                </tr>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <div
                                                                          class="t43"
                                                                          style="
                                                                            mso-line-height-rule: exactly;
                                                                            mso-line-height-alt: 4px;
                                                                            line-height: 4px;
                                                                            font-size: 1px;
                                                                            display: block;
                                                                          "
                                                                        >
                                                                          &nbsp;&nbsp;
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td align="center">
                                                                        <table
                                                                          class="t47"
                                                                          role="presentation"
                                                                          cellpadding="0"
                                                                          cellspacing="0"
                                                                          style="margin-left: auto; margin-right: auto"
                                                                        >
                                                                          <tr>
                                                                            <td
                                                                              width="448"
                                                                              class="t46"
                                                                              style="width: 600px"
                                                                            >
                                                                              <table
                                                                                class="t45"
                                                                                role="presentation"
                                                                                cellpadding="0"
                                                                                cellspacing="0"
                                                                                width="100%"
                                                                                style="width: 100%"
                                                                              >
                                                                                <tr>
                                                                                  <td class="t44">
                                                                                    <p
                                                                                      class="t42"
                                                                                      style="
                                                                                        margin: 0;
                                                                                        margin: 0;
                                                                                        font-family: Roboto,
                                                                                          BlinkMacSystemFont, Segoe UI,
                                                                                          Helvetica Neue, Arial,
                                                                                          sans-serif;
                                                                                        line-height: 22px;
                                                                                        font-weight: 400;
                                                                                        font-style: normal;
                                                                                        font-size: 16px;
                                                                                        text-decoration: none;
                                                                                        text-transform: none;
                                                                                        direction: ltr;
                                                                                        color: #333333;
                                                                                        text-align: left;
                                                                                        mso-line-height-rule: exactly;
                                                                                        mso-text-raise: 2px;
                                                                                      "
                                                                                    >
                                                                                      <span
                                                                                        class="t41"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          margin: 0;
                                                                                          font-weight: bold;
                                                                                          mso-line-height-rule: exactly;
                                                                                        "
                                                                                        >Category: </span
                                                                                      >${worker.categoryTitle}
                                                                                    </p>
                                                                                  </td>
                                                                                </tr>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>

                                                  <tr>
                                                    <td align="center">
                                                      <table
                                                        class="t60"
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        style="margin-left: auto; margin-right: auto"
                                                      >
                                                        <tr>
                                                          <td width="510" class="t59" style="width: 800px">
                                                            <table
                                                              class="t58"
                                                              role="presentation"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              width="100%"
                                                              style="width: 100%"
                                                            >
                                                              <tr>
                                                                <td
                                                                  class="t57"
                                                                  style="
                                                                    border: 1px solid #e3e3e3;
                                                                    overflow: hidden;
                                                                    padding: 10px 10px 10px 10px;
                                                                    border-radius: 0 0 6px 6px;
                                                                  "
                                                                >
                                                                  <table
                                                                    role="presentation"
                                                                    width="100%"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    style="width: 100% !important"
                                                                  >
                                                                    <tr>
                                                                      <td align="center">
                                                                        <table
                                                                          class="t56"
                                                                          role="presentation"
                                                                          cellpadding="0"
                                                                          cellspacing="0"
                                                                          style="margin-left: auto; margin-right: auto"
                                                                        >
                                                                          <tr>
                                                                            <td
                                                                              width="488"
                                                                              class="t55"
                                                                              style="width: 600px"
                                                                            ></td>
                                                                          </tr>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="padding: 30px">
                                     <a
                                                  href="${approveUrl}"
                                                  style="
                                                    display: inline-block;
                                                    padding: 12px 20px;
                                                    background-color: #22c55e;
                                                    color: white;
                                                    text-decoration: none;
                                                    border-radius: 6px;
                                                    font-weight: bold;
                                                  "
                                                >
                                                  ✅ Approve Worker
                                                </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t91"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 40px;
                                        line-height: 40px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t95"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-left: auto; margin-right: auto"
                                    >
                                      <tr>
                                        <td width="510" class="t94" style="width: 800px">
                                          <table
                                            class="t93"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td
                                                class="t92"
                                                style="
                                                  border-bottom: 2px solid #eeeeee;
                                                  border-top: 2px solid #eeeeee;
                                                  padding: 25px 0 25px 0;
                                                "
                                              >
                                                <div class="t90" style="width: 100%; text-align: left">
                                                  <div class="t89" style="display: inline-block">
                                                    <table
                                                      class="t88"
                                                      role="presentation"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      align="left"
                                                      valign="middle"
                                                    >
                                                      <tr class="t87">
                                                        <td></td>
                                                        <td class="t70" width="96.77686" valign="middle">
                                                          <table
                                                            role="presentation"
                                                            width="100%"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            class="t68"
                                                            style="width: 100%"
                                                          ></table>
                                                          <!--[if !mso]>-->
                                                          <div
                                                            class="t69"
                                                            style="
                                                              mso-line-height-rule: exactly;
                                                              font-size: 1px;
                                                              display: none;
                                                            "
                                                          >
                                                            &nbsp;&nbsp;
                                                          </div>
                                                          <!--<![endif]-->
                                                        </td>
                                                        <td class="t86" width="413.22314" valign="middle">
                                                          <table
                                                            role="presentation"
                                                            width="100%"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            class="t85"
                                                            style="width: 100%"
                                                          >
                                                            <tr>
                                                              <td class="t84">
                                                                <table
                                                                  role="presentation"
                                                                  width="100%"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  style="width: 100% !important"
                                                                >
                                                                  <tr>
                                                                    <td align="center">
                                                                      <table
                                                                        class="t76"
                                                                        role="presentation"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="margin-left: auto; margin-right: auto"
                                                                      >
                                                                        <tr>
                                                                          <td
                                                                            width="413.2231404958677"
                                                                            class="t75"
                                                                            style="width: 600px"
                                                                          >
                                                                            <table
                                                                              class="t74"
                                                                              role="presentation"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              width="100%"
                                                                              style="width: 100%"
                                                                            >
                                                                              <tr>
                                                                                <td class="t73"></td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td></td>
                                                                  </tr>
                                                                  <tr></tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                        <td></td>
                                                      </tr>
                                                    </table>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t96"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 40px;
                                        line-height: 40px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t101"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-left: auto; margin-right: auto"
                                    >
                                      <tr>
                                        <td class="t100">
                                          <table
                                            class="t99"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t98">
                                                <p
                                                  class="t97"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family: Poppins, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
                                                      Arial, sans-serif;
                                                    line-height: 22px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    font-size: 13px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #949494;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 3px;
                                                  "
                                                >
                                                  Sent with love by the Worker Trust Team
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t106"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-left: auto; margin-right: auto"
                                    >
                                      <tr>
                                        <td class="t105">
                                          <table
                                            class="t104"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t103">
                                                <p
                                                  class="t102"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family: Poppins, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
                                                      Arial, sans-serif;
                                                    line-height: 22px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    font-size: 13px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #949494;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 3px;
                                                  "
                                                >
                                                  Worker Trust, Inc., 555 JohnDoe St. San Francisco, CA 97891
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0">
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>
  </body>
</html>

`;
}
