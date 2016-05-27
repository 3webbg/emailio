var assert = require('assert');

options = {
  config: require("../config.json")
};

describe('Messages', function() {

  var email = '{"id":"1537fd0f1afb91cc","historyId":"1487","messages":[{"id":"1537fd0f1afb91cc","threadId":"1537fd0f1afb91cc","labelIds":["INBOX","CATEGORY_UPDATES"],"snippet":"Hi Berry, I&#39;m so glad you decided to try out Gmail. Here are a few tips to get you up and running","historyId":"1487","internalDate":"1458138312000","payload":{"mimeType":"multipart/alternative","headers":[{"name":"Delivered-To","value":"berry3web@gmail.com"},{"name":"Received","value":"by 10.31.141.12 with SMTP id p12csp1260718vkd;        Wed, 16 Mar 2016 07:25:13 -0700 (PDT)"},{"name":"X-Received","value":"by 10.50.150.105 with SMTP id uh9mr5992503igb.8.1458138313171;        Wed, 16 Mar 2016 07:25:13 -0700 (PDT)"},{"name":"Return-Path","value":"<3yGzpVgwKCQUfsi3-stwjuq3lttlqj.htrgjww381jglrfnq.htr@scoutcamp.bounces.google.com>"},{"name":"Received","value":"from mail-io0-x248.google.com (mail-io0-x248.google.com. [2607:f8b0:4001:c06::248])        by mx.google.com with ESMTPS id m25si4783481iod.164.2016.03.16.07.25.12        for <berry3web@gmail.com>        (version=TLS1_2 cipher=ECDHE-RSA-AES128-GCM-SHA256 bits=128/128);        Wed, 16 Mar 2016 07:25:13 -0700 (PDT)"},{"name":"Received-SPF","value":"pass (google.com: domain of 3yGzpVgwKCQUfsi3-stwjuq3lttlqj.htrgjww381jglrfnq.htr@scoutcamp.bounces.google.com designates 2607:f8b0:4001:c06::248 as permitted sender) client-ip=2607:f8b0:4001:c06::248;"},{"name":"Authentication-Results","value":"mx.google.com;       spf=pass (google.com: domain of 3yGzpVgwKCQUfsi3-stwjuq3lttlqj.htrgjww381jglrfnq.htr@scoutcamp.bounces.google.com designates 2607:f8b0:4001:c06::248 as permitted sender) smtp.mailfrom=3yGzpVgwKCQUfsi3-stwjuq3lttlqj.htrgjww381jglrfnq.htr@scoutcamp.bounces.google.com;       dkim=pass header.i=@google.com;       dmarc=pass (p=REJECT dis=NONE) header.from=google.com"},{"name":"Received","value":"by mail-io0-x248.google.com with SMTP id n190so80835059iof.3        for <berry3web@gmail.com>; Wed, 16 Mar 2016 07:25:12 -0700 (PDT)"},{"name":"DKIM-Signature","value":"v=1; a=rsa-sha256; c=relaxed/relaxed;        d=google.com; s=20120113;        h=mime-version:reply-to:feedback-id:message-id:date:subject:from:to;        bh=n94dhpGDYRsI7n2ksbEQM4c2H/F6MddYjAikRBCXJWE=;        b=ibApXfuXBVr22/2RDRlEPT1EgJMT1bGfTpAmJJ8L3lF1F8mazvDcS78hBMR0mKsY5b         EDxJIglIrhyh94SdVkVwTgVctaO8ugyzvsLj6ZgITaYG7X3CCDrCkKDNgX1vs4KolJek         /kO0YiLl/d9kUgwmeancZoUFX1lfNa+cmTy+nMbTtfl163TM61KJc7P28ItYU+QAQYTO         3SuXFWqZNBlQeunsp3B5dkZ7oU/VX5DbFJM5NfIcGi3Lp4CTw78tklaFIKT1mpqBArQ9         agwH8vegvB17S2Ah0+h9C6eQvOsCOVv1bx5gfS6GykLWBC8VmHnVtKZbcKGWkt4p0gb8         wsNw=="},{"name":"X-Google-DKIM-Signature","value":"v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20130820;        h=x-gm-message-state:mime-version:reply-to:feedback-id:message-id         :date:subject:from:to;        bh=n94dhpGDYRsI7n2ksbEQM4c2H/F6MddYjAikRBCXJWE=;        b=E+mvyXqBruL/7rmJ1is0goNaEFLxgzIeZZFIsbgNIO/e5PNkU3LNfAbhU11rC1R7MU         /67dUL8dCBXB6nClgMCrtowqRBH7xy42N5UE6hV34GXLFqvgLKoDKRV9Ku0To61JxWuJ         uo81GHJ33T0JGhEdEEaKyeCoBnYYKD88yLGDQALXPeeFyT2KfjNL9xTJWu9Uu3tRyyRE         2Chm6m0u1VLIhz3xGu9B6orm9vR22Pjo5cq5ezjo/SQsQ84jPMEEHaMWuEjXy2OZoT9t         FcF5habB1DvYlH/i0N37lo9WGUYECwpCHPAp3GiNfBpJBj0L4Q4EAWQ0+ZVG0viwb7mu         BSEQ=="},{"name":"X-Gm-Message-State","value":"AD7BkJIFfSTR42DWzuw+Fp31JrXxxAzn87snl81SEpmuZgr/r8FOk5mUy4HQ3SZYa1B8/AU="},{"name":"MIME-Version","value":"1.0"},{"name":"X-Received","value":"by 10.202.97.66 with SMTP id v63mr2466552oib.14.1458138312571; Wed, 16 Mar 2016 07:25:12 -0700 (PDT)"},{"name":"Reply-To","value":"Andy from Google <andy-noreply@google.com>"},{"name":"X-Google-Id","value":"SP#6395862091563008"},{"name":"Feedback-ID","value":"Len:D762016:C377502:gamma"},{"name":"Message-ID","value":"<a8e956c71f4044c6.1458138311629.787331.377502.en.8603040278e2f568@google.com>"},{"name":"Date","value":"Wed, 16 Mar 2016 14:25:12 +0000"},{"name":"Subject","value":"Berry, get more out of your new Google Account"},{"name":"From","value":"Andy from Google <andy-noreply@google.com>"},{"name":"To","value":"berry3web@gmail.com"},{"name":"Content-Type","value":"multipart/alternative; boundary=001a113d4844277e3a052e2b48c8"}]},"sizeEstimate":36183}]}';
  var sender = "Andy from Google <andy-noreply@google.com>";
  var label2ValuePair = [{name:'INBOX',value:1},  { name: 'CATEGORY_UPDATES', value: 1 } ];

  var oauthToken = "ya29.qAI3NYRoh3JI1qbtEviUyaSxour0VVQ51T3sQxXahSPGvfkn0bQL_9PhVa6W6-sy2t4";

  var messagelib = require('../lib/messages.js')(options);

  describe('#fetch()', function () {
    it('Fetches emails from gmail', function (done) {
      messagelib.fetch(oauthToken, 10, function(error, response) {
          assert.equal(error, null);
          done();
      });
    });
  });

  describe('#parse.header.from()', function () {
    it("Sender " + sender, function () {
      var parsed_sender = messagelib.parse.header.from(JSON.parse(email).messages[0]);
      assert.equal(parsed_sender, sender);
    });
  });

  describe('#parse.header.label2ValuePair()', function () {
    it("Parsing labels with adding extra value field", function () {
      var parsed_label2ValuePair = messagelib.parse.header.label2ValuePair(JSON.parse(email).messages[0]);
      assert.equal(parsed_label2ValuePair.length, label2ValuePair.length);
    });
  });

});