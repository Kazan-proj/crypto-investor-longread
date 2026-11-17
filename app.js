const SOURCES = {
  law: ['Федеральный закон № 282-ФЗ', 'https://www.consultant.ru/document/cons_doc_LAW_540983/'],
  cbr: ['Банк России: запуск рынка', 'https://www.cbr.ru/develop/cryptocurrency/'],
  registers: ['Реестры Банка России', 'https://www.cbr.ru/admissionfinmarket/register/'],
  admission: ['Банк России: первые участники', 'https://www.cbr.ru/press/event/?id=32894'],
  trading: ['Банк России: правила торгов', 'https://www.cbr.ru/press/event/?id=32972'],
  mica75: ['MiCA, статья 75', 'https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-75-providing-custody-and'],
  mica76: ['MiCA, статья 76', 'https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-76-operation-trading-platform-crypto'],
  mica77: ['MiCA, статья 77', 'https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-77-exchange-crypto-assets-funds-or']
};

const commonSteps = {
  0: {
    flow: 'ДО ДВИЖЕНИЯ ДЕНЕГ',
    title: 'Проверить участника и доступ',
    copy: 'Инвестор устанавливает, с какой организацией заключает договор. Посредник проводит предусмотренные проверки клиента и допуска к приобретению цифровой валюты.',
    actor: 'Инвестор и посредник',
    check: 'Сверить юридическое наименование и статус организации в реестре. Перед приобретением — проверить выполнение условий допуска, включая требуемое тестирование.',
    risk: 'Подмена сайта или начало операции без завершения предусмотренной проверки.',
    sources: ['registers', 'cbr']
  },
  1: {
    flow: 'ДВИЖЕНИЕ РУБЛЕЙ',
    title: 'Перевести рубли',
    copy: 'Банк исполняет платёжное распоряжение. После списания средств нужно отдельно убедиться, что соответствующая сумма стала доступна для сделки в выбранной договорной модели.',
    actor: 'Инвестор, банк и посредник',
    check: 'Проверить реквизиты получателя; сопоставить сумму, дату и номер банковского перевода с записью о зачислении у посредника.',
    risk: 'Банк списал рубли, но у посредника сумма не отражена как доступная; либо деньги отправлены не тому получателю.',
    sources: ['law']
  },
  3: {
    flow: 'УЧЁТ АКТИВА',
    title: 'Увидеть запись об активе',
    copy: 'После сделки приобретённая цифровая валюта должна отразиться в предусмотренной системе учёта. Подтверждение сделки и запись об активе являются разными свидетельствами.',
    actor: 'Цифровой депозитарий и инвестор',
    check: 'Сверить вид и количество цифровой валюты с результатом расчёта; проверить запись на цифровом счёте и предусмотренный договором порядок распоряжения.',
    risk: 'Сделка исполнена, но запись об активе отсутствует или не совпадает по виду либо количеству.',
    sources: ['law', 'admission', 'mica75']
  },
  5: {
    flow: 'ВОЗВРАТ РУБЛЕЙ',
    title: 'Проверить зачисление в банке',
    copy: 'После продажи рублёвый остаток у посредника и деньги на банковском счёте — разные состояния. Путь завершён после фактического зачисления рублёвого перевода банком.',
    actor: 'Инвестор, посредник и банк',
    check: 'Сверить счёт получателя, сумму и номер перевода с банковской выпиской; убедиться, что рубли действительно зачислены.',
    risk: 'В интерфейсе посредника указан статус «выведено», но на банковском счёте денег нет, либо реквизиты ошибочны.',
    sources: ['law']
  }
};

const routes = {
  exchange: {
    2: {
      flow: 'БИРЖЕВАЯ ВЕТВЬ',
      title: 'Подать заявку через брокера',
      copy: 'Инвестор задаёт актив, количество и ценовые параметры. Брокер принимает поручение и передаёт заявку организатору торгов. Отправка заявки не означает, что торги её приняли или сделка состоялась.',
      actor: 'Инвестор, брокер и организатор торгов',
      check: 'Проверить параметры до подтверждения. Затем сопоставить номер заявки, статус принятия, исполненный объём и цену с подтверждением брокера и данными торгов.',
      risk: 'Заявка отклонена или исполнена только частично, а остаток ошибочно показан как купленный.',
      sources: ['law', 'trading', 'mica76']
    },
    4: {
      flow: 'ОБРАТНАЯ СДЕЛКА · ТОРГИ',
      title: 'Направить заявку на продажу',
      copy: 'Брокер передаёт распоряжение на торги. Продажа зависит от встречного спроса и выбранного типа заявки; оценка позиции на экране не равна гарантированной сумме продажи.',
      actor: 'Инвестор, брокер и организатор торгов',
      check: 'Проверить исполненный объём и цену по отчёту. Лимитная цена ограничивает цену исполнения, но заявка может не исполниться.',
      risk: 'Цена снизилась или встречного спроса недостаточно для продажи нужного объёма. Рыночный риск остаётся.',
      sources: ['trading', 'mica76']
    }
  },
  dealer: {
    2: {
      flow: 'ВЕТВЬ ОБМЕНА',
      title: 'Купить у криптообменника',
      copy: 'Организация выступает собственным контрагентом и продаёт цифровую валюту от своего имени и за свой счёт вне организованных торгов. Это не заявка в книге биржевых заявок.',
      actor: 'Инвестор и криптообменник',
      check: 'Непосредственно перед подтверждением сравнить актив, объём, цену и сумму к оплате; затем сопоставить их с подтверждением сделки.',
      risk: 'Итоговые цена или объём обмена расходятся с предложением, которое было показано до подтверждения.',
      sources: ['admission', 'law', 'mica77']
    },
    4: {
      flow: 'ОБРАТНАЯ СДЕЛКА · ОБМЕН',
      title: 'Продать криптообменнику',
      copy: 'Криптообменник предлагает текущую цену или способ её определения и покупает актив у инвестора. Условия обмена отличаются от результата торговой заявки.',
      actor: 'Инвестор и криптообменник',
      check: 'Проверить текущую котировку и итоговый объём непосредственно перед подтверждением; сверить их с документом о сделке.',
      risk: 'Рыночная цена изменилась либо предложенный спред снижает получаемую сумму. Проверка условий позволяет понять цену, но не устраняет рыночный риск.',
      sources: ['admission', 'mica77']
    }
  }
};

const routeButtons = [...document.querySelectorAll('.route-choice')];
const stepButtons = [...document.querySelectorAll('.step-button')];
let activeRoute = 'exchange';
let activeStep = 0;

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function renderStep() {
  const step = commonSteps[activeStep] || routes[activeRoute][activeStep];
  setText('detail-counter', `ШАГ ${String(activeStep + 1).padStart(2, '0')} / 06`);
  setText('detail-flow', step.flow);
  setText('detail-title', step.title);
  setText('detail-copy', step.copy);
  setText('detail-actor', step.actor);
  setText('detail-check', step.check);
  setText('detail-risk', step.risk);

  const sourceNode = document.getElementById('detail-source');
  sourceNode.replaceChildren(...step.sources.flatMap((key, index) => {
    const [label, url] = SOURCES[key];
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label + ' ↗';
    return index === 0 ? [link] : [document.createTextNode(' · '), link];
  }));

  stepButtons.forEach((button, index) => {
    const selected = index === activeStep;
    button.classList.toggle('is-active', selected);
    if (selected) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  routeButtons.forEach(button => {
    const selected = button.dataset.route === activeRoute;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.getElementById('step-prev').disabled = activeStep === 0;
  document.getElementById('step-next').disabled = activeStep === 5;
}

routeButtons.forEach(button => button.addEventListener('click', () => {
  activeRoute = button.dataset.route;
  renderStep();
}));
stepButtons.forEach(button => button.addEventListener('click', () => {
  activeStep = Number(button.dataset.step);
  renderStep();
}));
document.getElementById('step-prev').addEventListener('click', () => {
  if (activeStep > 0) { activeStep -= 1; renderStep(); }
});
document.getElementById('step-next').addEventListener('click', () => {
  if (activeStep < 5) { activeStep += 1; renderStep(); }
});

const progressBar = document.getElementById('progress-bar');
let ticking = false;
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const value = total > 0 ? Math.max(0, Math.min(100, (window.scrollY / total) * 100)) : 0;
  progressBar.style.width = value + '%';
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress);
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateProgress);
renderStep();
updateProgress();
