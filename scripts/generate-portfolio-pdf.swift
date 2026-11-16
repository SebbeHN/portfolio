import AppKit
import CoreGraphics
import Foundation
import PDFKit

let pageSize = CGSize(width: 595, height: 842)
let margin: CGFloat = 48
let outputURL = URL(fileURLWithPath: CommandLine.arguments.count > 1
    ? CommandLine.arguments[1]
    : "public/Sebastian_Holmberg_Nilsson_Portfolio.pdf")

let background = NSColor(calibratedRed: 0.965, green: 0.953, blue: 0.925, alpha: 1)
let ink = NSColor(calibratedRed: 0.09, green: 0.09, blue: 0.08, alpha: 1)
let muted = NSColor(calibratedRed: 0.38, green: 0.37, blue: 0.34, alpha: 1)
let accent = NSColor(calibratedRed: 0.31, green: 0.40, blue: 0.08, alpha: 1)
let rule = NSColor(calibratedRed: 0.84, green: 0.82, blue: 0.77, alpha: 1)

guard let consumer = CGDataConsumer(url: outputURL as CFURL) else {
    fatalError("Could not create PDF output at \(outputURL.path)")
}
var mediaBox = CGRect(origin: .zero, size: pageSize)
guard let context = CGContext(consumer: consumer, mediaBox: &mediaBox, nil) else {
    fatalError("Could not create PDF drawing context")
}

func drawText(
    _ text: String,
    x: CGFloat,
    top: CGFloat,
    width: CGFloat,
    height: CGFloat,
    font: NSFont,
    color: NSColor,
    alignment: NSTextAlignment = .left,
    link: String? = nil
) {
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = alignment
    paragraph.lineBreakMode = .byWordWrapping
    paragraph.lineSpacing = 2
    var attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: color,
        .paragraphStyle: paragraph,
    ]
    if let link, let url = URL(string: link) {
        attributes[.link] = url
    }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(cgContext: context, flipped: false)
    NSAttributedString(string: text, attributes: attributes).draw(
        in: CGRect(x: x, y: pageSize.height - top - height, width: width, height: height)
    )
    NSGraphicsContext.restoreGraphicsState()
}

func fillRect(x: CGFloat, top: CGFloat, width: CGFloat, height: CGFloat, color: NSColor, radius: CGFloat = 0) {
    let rect = CGRect(x: x, y: pageSize.height - top - height, width: width, height: height)
    context.setFillColor(color.cgColor)
    if radius > 0 {
        context.addPath(CGPath(roundedRect: rect, cornerWidth: radius, cornerHeight: radius, transform: nil))
        context.fillPath()
    } else {
        context.fill(rect)
    }
}

func drawRule(top: CGFloat) {
    context.setStrokeColor(rule.cgColor)
    context.setLineWidth(1)
    context.move(to: CGPoint(x: margin, y: pageSize.height - top))
    context.addLine(to: CGPoint(x: pageSize.width - margin, y: pageSize.height - top))
    context.strokePath()
}

context.beginPDFPage(nil)
context.setFillColor(background.cgColor)
context.fill(CGRect(origin: .zero, size: pageSize))

fillRect(x: margin, top: 44, width: 4, height: 22, color: accent)
drawText("PORTFOLIOÖVERSIKT", x: margin + 14, top: 45, width: 250, height: 20,
         font: .systemFont(ofSize: 10, weight: .bold), color: accent)
drawText("Sebastian Holmberg Nilsson", x: margin, top: 78, width: 500, height: 43,
         font: .systemFont(ofSize: 32, weight: .bold), color: ink)
drawText("Junior systemutvecklare", x: margin, top: 124, width: 300, height: 22,
         font: .systemFont(ofSize: 15, weight: .medium), color: ink)
drawText("Skåne  ·  Söker junior/nyexaminerad roll i Malmö eller Lund",
         x: margin, top: 151, width: 490, height: 18,
         font: .systemFont(ofSize: 10.5), color: muted)

drawRule(top: 183)
drawText("KORT OM MIG", x: margin, top: 201, width: 200, height: 16,
         font: .systemFont(ofSize: 9, weight: .bold), color: accent)
drawText("Jag bygger webblösningar och gillar att ta idéer från problem till fungerande lösningar. Jag söker en junior eller nyexaminerad roll inom systemutveckling där jag kan fortsätta utvecklas genom riktiga problem.",
         x: margin, top: 222, width: 495, height: 48,
         font: .systemFont(ofSize: 11.5), color: ink)

drawText("UTVALDA PROJEKT", x: margin, top: 286, width: 240, height: 16,
         font: .systemFont(ofSize: 9, weight: .bold), color: accent)

let projects: [(String, String, String, String, String)] = [
    ("Öl-priser", "WEBBAPP",
     "En tjänst för att hitta ölpriser i Malmö och jämföra alternativ efter pris eller avstånd.",
     "github.com/SebbeHN/olpriser", "https://github.com/SebbeHN/olpriser"),
    ("BeUniq", "WEBBPLATS",
     "Webbplats för ett resebolag där besökare kan önska resor och få personliga offerter.",
     "beuniq.se", "https://www.beuniq.se"),
    ("AI Football Scout", "AI & ANALYS",
     "Utforskar hur AI kan användas för fotbollsscouting och spelaranalys.",
     "github.com/SebbeHN/ai-football-scout", "https://github.com/SebbeHN/ai-football-scout"),
]

for (index, project) in projects.enumerated() {
    let top = CGFloat(312 + index * 112)
    fillRect(x: margin, top: top, width: pageSize.width - margin * 2, height: 100, color: .white, radius: 5)
    drawText(project.0, x: margin + 14, top: top + 12, width: 320, height: 20,
             font: .systemFont(ofSize: 14, weight: .bold), color: ink)
    drawText(project.1, x: margin + 340, top: top + 14, width: 145, height: 16,
             font: .systemFont(ofSize: 8.5, weight: .bold), color: accent, alignment: .right)
    drawText(project.2, x: margin + 14, top: top + 39, width: 455, height: 30,
             font: .systemFont(ofSize: 10.5), color: muted)
    drawText(project.3, x: margin + 14, top: top + 75, width: 455, height: 16,
             font: .systemFont(ofSize: 9.5, weight: .medium), color: accent, link: project.4)
}

drawText("KOMPETENSER", x: margin, top: 664, width: 200, height: 16,
         font: .systemFont(ofSize: 9, weight: .bold), color: accent)
let skills = ["Java", "C#", "React", "Kotlin", "Python", "Spring Boot", "TypeScript"]
var skillX = margin
for skill in skills {
    let width = CGFloat(skill.count) * 6.1 + 22
    fillRect(x: skillX, top: 687, width: width, height: 25, color: .white, radius: 12)
    drawText(skill, x: skillX + 6, top: 693, width: width - 12, height: 14,
             font: .systemFont(ofSize: 9, weight: .medium), color: ink, alignment: .center)
    skillX += width + 8
}

drawRule(top: 742)
drawText("KONTAKT", x: margin, top: 760, width: 100, height: 16,
         font: .systemFont(ofSize: 9, weight: .bold), color: accent)
drawText("Sebbe_97@outlook.com", x: margin, top: 783, width: 175, height: 18,
         font: .systemFont(ofSize: 10, weight: .medium), color: ink, link: "mailto:Sebbe_97@outlook.com")
drawText("GitHub  ·  github.com/SebbeHN", x: 235, top: 783, width: 155, height: 18,
         font: .systemFont(ofSize: 9.5), color: ink, link: "https://github.com/SebbeHN")
drawText("LinkedIn  ↗", x: 410, top: 783, width: 135, height: 18,
         font: .systemFont(ofSize: 9.5), color: ink,
         link: "https://www.linkedin.com/in/sebastian-holmberg-nilsson-02a4161a1/")

context.endPDFPage()
context.closePDF()

guard let document = PDFDocument(url: outputURL), let page = document.page(at: 0) else {
    fatalError("Could not reopen generated portfolio PDF")
}

func addLink(x: CGFloat, top: CGFloat, width: CGFloat, height: CGFloat, url: String) {
    guard let destination = URL(string: url) else { return }
    let bounds = CGRect(x: x, y: pageSize.height - top - height, width: width, height: height)
    let annotation = PDFAnnotation(bounds: bounds, forType: .link, withProperties: nil)
    annotation.action = PDFActionURL(url: destination)
    page.addAnnotation(annotation)
}

addLink(x: margin + 14, top: 387, width: 220, height: 18, url: "https://github.com/SebbeHN/olpriser")
addLink(x: margin + 14, top: 499, width: 80, height: 18, url: "https://www.beuniq.se")
addLink(x: margin + 14, top: 611, width: 260, height: 18, url: "https://github.com/SebbeHN/ai-football-scout")
addLink(x: margin, top: 783, width: 175, height: 18, url: "mailto:Sebbe_97@outlook.com")
addLink(x: 235, top: 783, width: 155, height: 18, url: "https://github.com/SebbeHN")
addLink(x: 410, top: 783, width: 135, height: 18, url: "https://www.linkedin.com/in/sebastian-holmberg-nilsson-02a4161a1/")

guard document.write(to: outputURL) else {
    fatalError("Could not save PDF hyperlinks")
}
